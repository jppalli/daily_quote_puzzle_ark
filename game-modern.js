// Modern ES6+ Game Engine with PixiJS Integration
class DailyQuotePuzzle {
    constructor() {
        this.quotes = quotesCalendar;
        // Game initialization - will be set in init() after checking for saved state
        this.currentQuote = null;
        // Quote selected for today
        this.activeWord = null;
        this.solvedWords = new Set();
        this.authorSolved = false;
        this.isUnscrambling = false;
        this.gameComplete = false;
        this.startTime = null;
        this.endTime = null;
        this.gameTime = 0;

        // User input state
        this.userInput = '';
        this.availableLetters = [];
        this.usedLetters = [];

        // Settings
        this.soundEffectsEnabled = true;
        this.backgroundMusicEnabled = true;

        // Unscramble cooldown system
        this.unscrambleCooldown = 60000; // 60 seconds in milliseconds
        this.unscrambleLastUsed = 0;
        this.unscrambleCooldownInterval = null;

        // Calendar state
        this.currentCalendarMonth = new Date().getMonth();
        this.currentCalendarYear = new Date().getFullYear();

        // PixiJS Application
        this.pixiApp = null;
        this.particleContainer = null;

        // Sound system
        this.sounds = new Map();

        // Music tracks system
        this.musicTracks = {
            track1: {
                id: 'backgroundMusic',
                name: 'Classic Puzzle',
                unlocked: true,
                cost: 0,
                description: 'The original relaxing puzzle music'
            },
            track2: {
                id: 'backgroundMusic2',
                name: 'Jazz Vibes',
                unlocked: false,
                cost: 50,
                description: 'Smooth jazz for focused solving'
            },
            track3: {
                id: 'backgroundMusic3',
                name: 'Nature Sounds',
                unlocked: false,
                cost: 75,
                description: 'Peaceful nature ambience'
            },
            track4: {
                id: 'backgroundMusic4',
                name: 'Electronic Beats',
                unlocked: false,
                cost: 100,
                description: 'Upbeat electronic puzzle music'
            },
            track5: {
                id: 'backgroundMusic5',
                name: 'Orchestral',
                unlocked: false,
                cost: 150,
                description: 'Epic orchestral puzzle themes'
            }
        };

        this.currentMusicTrack = 'backgroundMusic';

        // Arkadium SDK Integration
        this.arkadium = null;

        // DOM Elements
        this.elements = this.initializeElements();

        // Initialize the game
        this.init();
    }

    initializeElements() {
        const elements = {
            quoteText: document.getElementById('quoteText'),
            quoteAuthor: document.getElementById('quoteAuthor'),
            congrats: document.getElementById('congrats'),
            inputArea: document.getElementById('inputArea'),
            inputTitle: document.getElementById('inputTitle'),
            letterCells: document.getElementById('letterCells'),
            availableLetters: document.getElementById('availableLetters'),
            resetBtn: document.getElementById('resetBtn'),
            backspaceBtn: document.getElementById('backspaceBtn'),
            unscrambleBtn: document.getElementById('unscrambleBtn'),
            unscrambleTimer: document.getElementById('unscrambleTimer'),
            // Hamburger menu elements
            hamburgerMenu: document.getElementById('hamburgerMenu'),
            slideMenu: document.getElementById('slideMenu'),
            menuOverlay: document.getElementById('menuOverlay'),
            closeMenu: document.getElementById('closeMenu'),
            menuStatsLink: document.getElementById('menuStatsLink'),
            menuCalendarLink: document.getElementById('menuCalendarLink'),
            menuHelpLink: document.getElementById('menuHelpLink'),
            menuTestPersistenceLink: document.getElementById('menuTestPersistenceLink'),
            menuChangeSongLink: document.getElementById('menuChangeSongLink'),
            menuSoundEffectsToggle: document.getElementById('menuSoundEffectsToggle'),
            menuBackgroundMusicToggle: document.getElementById('menuBackgroundMusicToggle'),
            // Legacy elements (keeping for backward compatibility)
            helpIcon: document.getElementById('helpIcon'),
            calendarIcon: document.getElementById('calendarIcon'),
            statsIcon: document.getElementById('statsIcon'),
            calendarModal: document.getElementById('calendarModal'),
            closeCalendar: document.getElementById('closeCalendar'),
            calendarDates: document.getElementById('calendarDates'),
            dateLine: document.getElementById('dateLine'),
            calendarStatus: document.getElementById('calendarStatus'),
            helpModal: document.getElementById('helpModal'),
            closeHelp: document.getElementById('closeHelp'),
            statsModal: document.getElementById('statsModal'),
            closeStats: document.getElementById('closeStats'),
            settingsModal: document.getElementById('settingsModal'),
            closeSettings: document.getElementById('closeSettings'),
            settingsIcon: document.getElementById('settingsIcon'),
            soundEffectsToggle: document.getElementById('soundEffectsToggle'),
            backgroundMusicToggle: document.getElementById('backgroundMusicToggle'),
            changeSongBtn: document.getElementById('changeSongBtn'),
            musicSelectionModal: document.getElementById('musicSelectionModal'),
            closeMusicSelection: document.getElementById('closeMusicSelection'),
            musicTracksGrid: document.getElementById('musicTracksGrid'),
            played: document.getElementById('played'),
            winRate: document.getElementById('winRate'),
            currentStreak: document.getElementById('currentStreak'),
            maxStreak: document.getElementById('maxStreak'),
            prevMonth: document.getElementById('prevMonth'),
            nextMonth: document.getElementById('nextMonth'),
            calendarMonthYear: document.getElementById('calendarMonthYear'),
            pastChallengesBtn: document.getElementById('pastChallengesBtn')
        };

        // Validate DOM elements are available

        return elements;
    }

    async init() {
        this.startTime = new Date();
        await this.initializePixiJS();
        await this.initializeSounds();

        // Initialize Arkadium SDK
        this.arkadium = new ArkadiumIntegration();

        // Notify SDK that game is ready to be shown
        if (this.arkadium.sdk) {
            this.arkadium.sdk.lifecycle.onTestReady();
        }

        this.loadSettings();
        // this.loadMusicTracks(); // Music selection disabled
        await this.loadUserData();

        // Check for shared challenge in URL
        const sharedChallengeLoaded = await this.checkForSharedChallenge();

        // Check for saved current puzzle state
        const savedCurrentPuzzle = await this.loadCurrentPuzzleState();

        if (sharedChallengeLoaded) {
            // Shared challenge takes priority
            console.log('📤 Shared challenge loaded, ignoring saved state');
        } else if (savedCurrentPuzzle) {
            // Restore saved puzzle state
            console.log('🔄 Restoring saved puzzle state:', savedCurrentPuzzle.date);
            await this.loadChallengeForDate(savedCurrentPuzzle.date);
        } else {
            // No saved state, load today's puzzle
            console.log('📅 No saved state found, loading today\'s puzzle');
            this.currentQuote = this.findTodayQuote();
            await this.checkQuoteCompletionStatus();
        }

        this.renderQuote();
        this.updateDateDisplay();
        this.renderInputArea();
        this.setupEventListeners();

        // Ensure all modals are hidden
        if (this.elements.calendarModal) this.elements.calendarModal.style.display = 'none';
        if (this.elements.helpModal) this.elements.helpModal.style.display = 'none';
        if (this.elements.statsModal) this.elements.statsModal.style.display = 'none';
        if (this.elements.settingsModal) this.elements.settingsModal.style.display = 'none';

        // Ensure all modals are properly hidden

        // Auto-activate first word only if not already completed
        if (!(await this.isQuoteCompleted()) && this.currentQuote.scrambledWords.length > 0) {
            setTimeout(() => {
                this.handleWordClick(this.currentQuote.scrambledWords[0]);
            }, 500);
        }

        // Set up audio context and user interaction listeners for background music
        this.setupAudioContext();

        // Check unscramble cooldown status
        this.checkUnscrambleCooldown();
    }

    setupAudioContext() {
        // Create audio context for better audio handling
        try {
            window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (error) {
            console.log('Could not create audio context:', error);
        }

        // Add event listeners for user interaction to enable audio
        const enableAudio = this.enableAudioAfterInteraction.bind(this);
        document.addEventListener('click', enableAudio, { once: true });
        document.addEventListener('keydown', enableAudio, { once: true });
        document.addEventListener('touchstart', enableAudio, { once: true });

        // Also try to start music after a delay (in case user has already interacted)
        setTimeout(() => {
            if (this.backgroundMusicEnabled) {
                this.playBackgroundMusic();
            }
        }, 2000);
    }



    async initializePixiJS() {
        // Temporarily disable PixiJS to avoid visual issues
        // Will be re-enabled when particle effects are implemented
        console.log('PixiJS initialization disabled for now');
        return;

        // Original code commented out for future use:
        /*
        try {
            // Wait a bit for DOM to be fully rendered
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // Get the game container dimensions
            const gameContainer = document.querySelector('.newspaper-container');
            if (!gameContainer) {
                console.log('Game container not found, skipping PixiJS initialization');
                return;
            }
            
            const containerRect = gameContainer.getBoundingClientRect();
            
            // Ensure we have valid dimensions
            if (containerRect.width === 0 || containerRect.height === 0) {
                console.log('Container has zero dimensions, using fallback size');
                this.pixiApp = new PIXI.Application({
                    width: 800,
                    height: 600,
                    transparent: true,
                    antialias: true,
                    resolution: window.devicePixelRatio || 1
                });
            } else {
                // Create a PixiJS application sized to match the game container
                this.pixiApp = new PIXI.Application({
                    width: containerRect.width,
                    height: containerRect.height,
                    transparent: true,
                    antialias: true,
                    resolution: window.devicePixelRatio || 1
                });
            }
            
            // Create particle container
            this.particleContainer = new PIXI.Container();
            this.pixiApp.stage.addChild(this.particleContainer);
            
            // Position the canvas to overlay the game container
            this.pixiApp.view.style.position = 'absolute';
            this.pixiApp.view.style.top = containerRect.top + 'px';
            this.pixiApp.view.style.left = containerRect.left + 'px';
            this.pixiApp.view.style.pointerEvents = 'none';
            this.pixiApp.view.style.zIndex = '1000';
            
            // Add to body
            document.body.appendChild(this.pixiApp.view);
            
            // Update canvas position on window resize
            window.addEventListener('resize', () => {
                if (this.pixiApp && this.pixiApp.view && gameContainer) {
                    const newRect = gameContainer.getBoundingClientRect();
                    this.pixiApp.view.style.top = newRect.top + 'px';
                    this.pixiApp.view.style.left = newRect.left + 'px';
                }
            });
            
        } catch (error) {
            console.log('PixiJS initialization failed:', error);
        }
        */
    }

    async initializeSounds() {
        const soundFiles = {
            keyType: 'sounds/keytype.mp3',
            wordComplete: 'sounds/word-complete.mp3',
            authorComplete: 'sounds/author-complete.mp3',
            puzzleComplete: 'sounds/puzzle-complete.mp3',
            buttonClick: 'sounds/button-click.mp3',
            wordActivate: 'sounds/word-activate.mp3',
            error: 'sounds/error.mp3',
            celebration: 'sounds/celebration.mp3',
            reset: 'sounds/reset.mp3',
            backspace: 'sounds/backspace.mp3',
            quoteComplete: 'sounds/quote-complete.mp3',
            backgroundMusic: 'sounds/background-music.mp3',
            backgroundMusic2: 'sounds/background-music.mp3', // Placeholder for now
            backgroundMusic3: 'sounds/background-music.mp3', // Placeholder for now
            backgroundMusic4: 'sounds/background-music.mp3', // Placeholder for now
            backgroundMusic5: 'sounds/background-music.mp3'  // Placeholder for now
        };

        for (const [name, path] of Object.entries(soundFiles)) {
            try {
                const audio = new Audio(path);
                audio.preload = 'auto';

                if (name === 'backgroundMusic') {
                    audio.loop = true;
                    audio.volume = 0.2;
                } else {
                    audio.volume = 0.5;
                }

                audio.addEventListener('error', () => {
                    console.log(`Could not load sound: ${path}`);
                });

                audio.addEventListener('canplaythrough', () => {
                    this.sounds.set(name, audio);
                });

            } catch (error) {
                console.log(`Error loading sound ${name}:`, error);
            }
        }
    }

    playSound(soundName, volume = 0.5) {
        try {
            const audio = this.sounds.get(soundName);
            if (audio && this.soundEffectsEnabled) {
                const audioClone = audio.cloneNode();
                audioClone.volume = volume;
                audioClone.play().catch(e => {
                    console.log(`Could not play sound: ${soundName}`);
                });
            }
        } catch (error) {
            console.log(`Error playing sound ${soundName}:`, error);
        }
    }

    generateTypingSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();

            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }

            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1);

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);

            oscillator.type = 'square';
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.15);
        } catch (error) {
            console.log('Could not generate typing sound:', error);
        }
    }

    playTypingSound() {
        if (!this.soundEffectsEnabled) return;

        if (this.sounds.has('keyType')) {
            this.playSound('keyType', 0.3);
        } else {
            this.generateTypingSound();
        }
    }

    playWordCompleteSound() {
        this.playSound('wordComplete', 0.4);
    }

    playAuthorCompleteSound() {
        this.playSound('authorComplete', 0.4);
    }

    playPuzzleCompleteSound() {
        this.playSound('puzzleComplete', 0.6);
    }

    playButtonClickSound() {
        this.playSound('buttonClick', 0.3);
    }

    playWordActivateSound() {
        this.playSound('wordActivate', 0.3);
    }

    playErrorSound() {
        this.playSound('error', 0.4);
    }

    playCelebrationSound() {
        this.playSound('celebration', 0.5);
    }

    playResetSound() {
        this.playSound('reset', 0.4);
    }

    playBackspaceSound() {
        console.log('🎵 Playing backspace sound...');
        this.playSound('backspace', 0.4);
    }

    playQuoteCompleteSound() {
        this.playSound('quoteComplete', 0.6);
    }

    playBackgroundMusic() {
        try {
            const audio = this.sounds.get(this.currentMusicTrack);
            if (audio && this.backgroundMusicEnabled) {
                if (audio.paused) {
                    audio.currentTime = 0;
                }
                audio.play().catch(e => {
                    console.log('Could not play background music:', e);
                });
            }
        } catch (error) {
            console.log('Error playing background music:', error);
        }
    }

    // Method to enable audio after user interaction
    enableAudioAfterInteraction() {
        // Resume any suspended audio context
        if (window.audioContext && window.audioContext.state === 'suspended') {
            window.audioContext.resume();
        }

        // Start background music if enabled
        if (this.backgroundMusicEnabled) {
            setTimeout(() => {
                this.playBackgroundMusic();
            }, 100);
        }

        // Remove the one-time event listeners (they should auto-remove with { once: true })
        console.log('Audio enabled after user interaction');
    }

    pauseBackgroundMusic() {
        try {
            const audio = this.sounds.get(this.currentMusicTrack);
            if (audio) {
                audio.pause();
            }
        } catch (error) {
            console.log('Error pausing background music:', error);
        }
    }

    toggleBackgroundMusic() {
        if (this.backgroundMusicEnabled) {
            const audio = this.sounds.get(this.currentMusicTrack);
            if (audio && audio.paused) {
                this.playBackgroundMusic();
            }
        } else {
            this.pauseBackgroundMusic();
        }
    }

    saveSettings() {
        const settings = {
            soundEffectsEnabled: this.soundEffectsEnabled,
            backgroundMusicEnabled: this.backgroundMusicEnabled
        };
        localStorage.setItem('dailyQuotePuzzleSettings', JSON.stringify(settings));
    }

    loadSettings() {
        try {
            const savedSettings = localStorage.getItem('dailyQuotePuzzleSettings');
            if (savedSettings) {
                const settings = JSON.parse(savedSettings);
                this.soundEffectsEnabled = settings.soundEffectsEnabled !== undefined ? settings.soundEffectsEnabled : true;
                this.backgroundMusicEnabled = settings.backgroundMusicEnabled !== undefined ? settings.backgroundMusicEnabled : true;
            }
        } catch (error) {
            console.log('Could not load settings:', error);
            this.soundEffectsEnabled = true;
            this.backgroundMusicEnabled = true;
        }

        // Update both old and new toggle elements
        if (this.elements.soundEffectsToggle) {
            this.elements.soundEffectsToggle.checked = this.soundEffectsEnabled;
        }
        if (this.elements.backgroundMusicToggle) {
            this.elements.backgroundMusicToggle.checked = this.backgroundMusicEnabled;
        }
        if (this.elements.menuSoundEffectsToggle) {
            this.elements.menuSoundEffectsToggle.checked = this.soundEffectsEnabled;
        }
        if (this.elements.menuBackgroundMusicToggle) {
            this.elements.menuBackgroundMusicToggle.checked = this.backgroundMusicEnabled;
        }
        // Don't auto-start background music due to browser autoplay restrictions
        // this.toggleBackgroundMusic();
    }

    async loadUserData() {
        // Try to load from Arkadium remote persistence first
        if (this.arkadium && this.arkadium.isInitialized) {
            try {
                const remoteData = await this.arkadium.loadRemoteData('quotePuzzleUserData');
                if (remoteData) {
                    console.log('📂 User data loaded from remote storage');
                    return remoteData;
                }
            } catch (error) {
                console.error('❌ Failed to load from remote storage:', error);
            }
        }

        // Fallback to local storage
        const userData = JSON.parse(localStorage.getItem('quotePuzzleUserData')) || {
            puzzles: {},
            stats: {
                totalSolved: 0,
                currentStreak: 0,
                maxStreak: 0,
                totalTime: 0,
                lastPlayed: null
            }
        };
        return userData;
    }

    async saveUserData(userData) {
        // Save to local storage as backup
        localStorage.setItem('quotePuzzleUserData', JSON.stringify(userData));

        // Save to Arkadium remote persistence
        if (this.arkadium && this.arkadium.isInitialized) {
            try {
                await this.arkadium.saveRemoteData('quotePuzzleUserData', userData);
                console.log('💾 User data saved to remote storage');
            } catch (error) {
                console.error('❌ Failed to save to remote storage:', error);
            }
        }
    }

    async saveCurrentPuzzleState() {
        if (!this.currentQuote) return;

        try {
            const currentState = {
                date: this.currentQuote.date,
                solvedWords: Array.from(this.solvedWords),
                authorSolved: this.authorSolved,
                gameComplete: this.gameComplete,
                activeWord: this.activeWord ? this.activeWord.original : null,
                userInput: this.userInput,
                usedLetters: this.usedLetters,
                timestamp: Date.now()
            };

            localStorage.setItem('dailyQuotePuzzleCurrentState', JSON.stringify(currentState));
            console.log('💾 Saved current puzzle state:', currentState.date);
        } catch (error) {
            console.error('Error saving current puzzle state:', error);
        }
    }

    async loadCurrentPuzzleState() {
        try {
            const stateStr = localStorage.getItem('dailyQuotePuzzleCurrentState');
            if (stateStr) {
                const state = JSON.parse(stateStr);

                // Check if the saved state is from today (if so, don't restore it)
                const today = new Date();
                const todayStr = this.formatDate(today);
                if (state.date === todayStr) {
                    console.log('🗑️ Saved state is from today, clearing it');
                    localStorage.removeItem('dailyQuotePuzzleCurrentState');
                    return null;
                }

                // Check if the saved state is too old (older than 7 days)
                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                const savedDate = new Date(state.date);
                if (savedDate < sevenDaysAgo) {
                    console.log('🗑️ Saved state is too old, clearing it');
                    localStorage.removeItem('dailyQuotePuzzleCurrentState');
                    return null;
                }

                console.log('📂 Found saved puzzle state:', state.date);
                return state;
            }
        } catch (error) {
            console.error('Error loading current puzzle state:', error);
        }

        return null;
    }

    async recordPuzzleCompletion() {
        const userData = await this.loadUserData();
        const dateStr = this.currentQuote.date;
        this.endTime = new Date();
        this.gameTime = Math.floor((this.endTime - this.startTime) / 1000);

        userData.puzzles[dateStr] = {
            solved: true,
            time: this.gameTime,
            date: dateStr,
            solvedWords: Array.from(this.solvedWords),
            authorSolved: this.authorSolved,
            completedAt: new Date().toISOString()
        };

        // Update total solved count
        userData.stats.totalSolved = Object.values(userData.puzzles).filter(p => p.solved).length;

        // Calculate current streak properly
        this.calculateCurrentStreak(userData);

        // Update max streak if current streak is higher
        if (userData.stats.currentStreak > userData.stats.maxStreak) {
            userData.stats.maxStreak = userData.stats.currentStreak;
        }

        // Update total time and recalculate average
        this.updateTotalTimeAndAverage(userData);
        userData.stats.lastPlayed = dateStr;

        await this.saveUserData(userData);

        // Clear saved puzzle state when puzzle is completed
        localStorage.removeItem('dailyQuotePuzzleCurrentState');
        console.log('🗑️ Cleared saved puzzle state after completion');
    }

    calculateCurrentStreak(userData) {
        const today = new Date();
        const todayStr = this.formatDate(today);
        let currentStreak = 0;
        let checkDate = new Date(today);

        // Count consecutive days backwards from today
        while (true) {
            const dateStr = this.formatDate(checkDate);
            if (userData.puzzles[dateStr]?.solved) {
                currentStreak++;
                checkDate.setDate(checkDate.getDate() - 1);
            } else {
                break;
            }
        }

        userData.stats.currentStreak = currentStreak;
    }

    updateTotalTimeAndAverage(userData) {
        // Calculate total time from all completed puzzles
        const completedPuzzles = Object.values(userData.puzzles).filter(p => p.solved);
        userData.stats.totalTime = completedPuzzles.reduce((total, puzzle) => total + (puzzle.time || 0), 0);
    }

    async updateStatsDisplay() {
        const userData = await this.loadUserData();

        // Recalculate streak and time to ensure accuracy
        this.calculateCurrentStreak(userData);
        this.updateTotalTimeAndAverage(userData);

        const stats = userData.stats;
        const totalPlayed = Object.keys(userData.puzzles).length;
        const winRate = totalPlayed > 0 ? Math.round((stats.totalSolved / totalPlayed) * 100) : 0;

        this.elements.played.textContent = totalPlayed;
        this.elements.winRate.textContent = `${winRate}%`;
        this.elements.currentStreak.textContent = stats.currentStreak;
        this.elements.maxStreak.textContent = stats.maxStreak;
    }

    async updateCongratsStats() {
        const userData = await this.loadUserData();

        // Recalculate streak and time to ensure accuracy
        this.calculateCurrentStreak(userData);
        this.updateTotalTimeAndAverage(userData);

        const stats = userData.stats;
        const totalPlayed = Object.keys(userData.puzzles).length;
        const winRate = totalPlayed > 0 ? Math.round((stats.totalSolved / totalPlayed) * 100) : 0;

        document.getElementById('congratsPlayed').textContent = totalPlayed;
        document.getElementById('congratsWinRate').textContent = `${winRate}%`;
        document.getElementById('congratsCurrentStreak').textContent = stats.currentStreak;
        document.getElementById('congratsMaxStreak').textContent = stats.maxStreak;
    }

    updateDateDisplay() {
        // Only update date display if the element exists
        if (this.elements.dateLine) {
            const date = new Date(this.currentQuote.date);
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            this.elements.dateLine.textContent = date.toLocaleDateString('en-US', options);
        }
    }

    formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    findTodayQuote() {
        const today = new Date();
        const todayStr = this.formatDate(today);

        console.log('🔍 findTodayQuote() called');
        console.log('📅 Today:', todayStr);
        console.log('📚 Total quotes available:', this.quotes.length);

        // Find today's quote
        const todayQuote = this.quotes.find(q => q.date === todayStr);

        if (todayQuote) {
            console.log(`✅ Found today's quote for ${todayStr}: "${todayQuote.text}"`);
            return todayQuote;
        } else {
            console.log(`❌ No quote found for today (${todayStr}), using first quote as fallback`);
            console.log('📋 Available dates (first 10):', this.quotes.slice(0, 10).map(q => q.date));
            return this.quotes[0];
        }
    }

    toTitleCase(str) {
        return str.replace(/\w\S*/g, (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    getProperCapitalization(word, index, allWords) {
        const lowerWord = word.toLowerCase();

        if (index === 0) {
            return lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1);
        }

        if (index > 0) {
            const prevWord = allWords[index - 1];
            if (prevWord && /[.!?]$/.test(prevWord.trim())) {
                return lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1);
            }
        }

        const properNouns = [
            'jobs', 'steve', 'lennon', 'john', 'wilde', 'oscar', 'roosevelt', 'eleanor',
            'disney', 'walt', 'mandela', 'nelson', 'einstein', 'albert', 'gandhi', 'mahatma',
            'luther', 'martin', 'king', 'teresa', 'mother', 'ford', 'henry', 'edison', 'thomas',
            'curie', 'marie', 'lincoln', 'abraham', 'washington', 'george', 'jefferson', 'thomas',
            'franklin', 'benjamin', 'churchill', 'winston', 'kennedy', 'john', 'reagan', 'ronald',
            'obama', 'barack', 'clinton', 'bill', 'bush', 'george', 'carter', 'jimmy',
            'america', 'american', 'united', 'states', 'england', 'britain', 'france', 'germany',
            'italy', 'spain', 'russia', 'china', 'japan', 'india', 'africa', 'europe', 'asia',
            'australia', 'canada', 'mexico', 'brazil', 'argentina', 'egypt', 'israel', 'turkey',
            'greece', 'poland', 'sweden', 'norway', 'denmark', 'finland', 'ireland', 'scotland',
            'wales', 'london', 'paris', 'berlin', 'rome', 'madrid', 'moscow', 'beijing', 'tokyo',
            'delhi', 'mumbai', 'sydney', 'toronto', 'montreal', 'vancouver', 'new', 'york',
            'los', 'angeles', 'chicago', 'houston', 'philadelphia', 'phoenix', 'san', 'antonio',
            'diego', 'dallas', 'jose', 'austin', 'jacksonville', 'francisco', 'columbus',
            'charlotte', 'fort', 'worth', 'indianapolis', 'seattle', 'denver', 'washington',
            'boston', 'nashville', 'baltimore', 'oklahoma', 'portland', 'vegas', 'louisville',
            'milwaukee', 'albuquerque', 'tucson', 'fresno', 'sacramento', 'mesa', 'kansas',
            'atlanta', 'long', 'beach', 'colorado', 'springs', 'raleigh', 'omaha', 'miami',
            'oakland', 'minneapolis', 'tulsa', 'cleveland', 'wichita', 'arlington',
            'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday',
            'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august',
            'september', 'october', 'november', 'december',
            'god', 'lord', 'jesus', 'christ', 'buddha', 'allah', 'christmas', 'easter',
            'thanksgiving', 'halloween', 'valentine', 'patrick', 'internet', 'facebook',
            'google', 'apple', 'microsoft', 'amazon', 'twitter', 'instagram', 'youtube',
            'netflix', 'disney', 'marvel', 'dc', 'batman', 'superman', 'spiderman'
        ];

        if (properNouns.includes(lowerWord)) {
            return lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1);
        }

        if (lowerWord === 'i') {
            return 'I';
        }

        return lowerWord;
    }

    renderQuote() {
        const words = this.currentQuote.text.split(' ');
        let html = '';

        // If game is complete (viewing a completed puzzle), show all words as solved
        if (this.gameComplete) {
            words.forEach((word, index) => {
                const displayWord = this.getProperCapitalization(word, index, words);
                html += `<span class="quote-word">${displayWord}</span> `;
            });
        } else {
            // Normal game logic for active puzzles
            words.forEach((word, index) => {
                const scrambledWord = this.currentQuote.scrambledWords.find(sw => sw.index === index);
                const isSolved = scrambledWord && this.solvedWords.has(scrambledWord.original);

                if (scrambledWord && !isSolved) {
                    const isActive = this.activeWord && this.activeWord.original === scrambledWord.original;
                    html += `<span class="quote-word scrambled ${isActive ? 'active' : ''}" 
                                data-word-index="${index}">${scrambledWord.scrambled}</span> `;
                } else {
                    const displayWord = isSolved ?
                        this.getProperCapitalization(scrambledWord.original, index, words) :
                        this.getProperCapitalization(word, index, words);
                    html += `<span class="quote-word">${displayWord}</span> `;
                }
            });
        }

        // Add quotation marks around the entire quote
        this.elements.quoteText.innerHTML = `"${html.trim()}"`;

        // Only add click handlers if game is not complete
        if (!this.gameComplete) {
            document.querySelectorAll('.quote-word.scrambled').forEach(el => {
                this.addMobileTouchHandling(el, () => this.handleWordClick(
                    this.currentQuote.scrambledWords.find(sw => sw.index === parseInt(el.dataset.wordIndex))
                ));
            });
        }

        // Handle author display
        if (this.authorSolved || this.gameComplete) {
            const authorName = this.toTitleCase(this.currentQuote.author);
            this.elements.quoteAuthor.textContent = `- ${authorName}`;
            this.elements.quoteAuthor.className = 'author';
        } else {
            const isActive = this.activeWord && this.activeWord.isAuthor;
            // Display scrambled author with gaps between words
            const scrambledAuthorWithGaps = this.currentQuote.scrambledAuthor.replace(/\s+/g, '   ');
            this.elements.quoteAuthor.innerHTML = `<span class="author scrambled ${isActive ? 'active' : ''}"
                                                        id="authorScrambled">${scrambledAuthorWithGaps}</span>`;
            const authorElement = document.getElementById('authorScrambled');
            if (authorElement) {
                this.addMobileTouchHandling(authorElement, () => this.handleAuthorClick());
            }
        }
    }

    handleWordClick(wordData) {
        if (this.solvedWords.has(wordData.original) || this.isUnscrambling) return;

        document.querySelectorAll('.quote-word.active').forEach(el => {
            el.classList.remove('active');
        });
        document.querySelectorAll('.author.active').forEach(el => {
            el.classList.remove('active');
        });

        const wordElements = document.querySelectorAll('.quote-word');
        const targetWordEl = Array.from(wordElements).find(el =>
            el.dataset.wordIndex == wordData.index
        );
        if (targetWordEl) {
            targetWordEl.classList.add('active');
        }

        this.activeWord = wordData;
        this.userInput = '';
        this.availableLetters = wordData.scrambled.split('');
        this.usedLetters = [];

        this.renderInputArea();
    }

    handleAuthorClick() {
        if (this.authorSolved || this.isUnscrambling) return;

        document.querySelectorAll('.quote-word.active').forEach(el => {
            el.classList.remove('active');
        });
        document.querySelectorAll('.author.active').forEach(el => {
            el.classList.remove('active');
        });

        const authorEl = document.querySelector('.author.scrambled');
        if (authorEl) {
            authorEl.classList.add('active');
        }

        this.activeWord = {
            original: this.currentQuote.author.toLowerCase(),
            scrambled: this.currentQuote.scrambledAuthor,
            isAuthor: true
        };

        this.userInput = '';
        // For authors, keep all letters together without spaces and track word structure
        this.availableLetters = this.currentQuote.scrambledAuthor.replace(/\s/g, '').split('');
        this.authorWordStructure = this.currentQuote.author.split(' ').map(word => word.length);
        this.usedLetters = [];

        this.renderInputArea();
    }

    renderInputArea() {
        if (!this.activeWord) {
            if (this.solvedWords.size === this.currentQuote.scrambledWords.length && this.authorSolved) {
                this.elements.inputArea.classList.remove('show');
                return;
            }

            const firstWord = this.currentQuote.scrambledWords.find(word => !this.solvedWords.has(word.original));
            if (firstWord) {
                setTimeout(() => this.handleWordClick(firstWord), 100);
            } else if (!this.authorSolved) {
                setTimeout(() => this.handleAuthorClick(), 100);
            }
            return;
        }

        this.elements.inputArea.classList.add('show');
        this.elements.inputTitle.textContent = this.activeWord.isAuthor
            ? 'Unscramble Author'
            : 'Unscramble Word';

        const targetLength = this.activeWord.original.length;
        this.elements.letterCells.innerHTML = '';

        if (this.activeWord.isAuthor && this.authorWordStructure) {
            // For authors, create input boxes with gaps between word groups
            let userInputIndex = 0;
            let cellIndex = 0;

            this.authorWordStructure.forEach((wordLength, wordIndex) => {
                // Add cells for this word
                for (let i = 0; i < wordLength; i++) {
                    const cell = document.createElement('div');
                    cell.className = 'letter-cell';
                    cell.textContent = this.userInput[userInputIndex] || '';
                    this.elements.letterCells.appendChild(cell);
                    userInputIndex++;
                    cellIndex++;
                }

                // Add gap after each word except the last
                if (wordIndex < this.authorWordStructure.length - 1) {
                    const gapCell = document.createElement('div');
                    gapCell.className = 'author-gap';
                    gapCell.style.width = '30px';
                    gapCell.style.height = '50px';
                    gapCell.style.display = 'inline-block';
                    gapCell.style.position = 'relative';
                    // Add visual indicator for word separation
                    gapCell.innerHTML = '<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 2px; height: 20px; background: #ddd;"></div>';
                    this.elements.letterCells.appendChild(gapCell);
                    cellIndex++;
                }
            });
        } else {
            // For regular words, create normal input boxes
            for (let i = 0; i < targetLength; i++) {
                const cell = document.createElement('div');
                cell.className = 'letter-cell';
                cell.textContent = this.userInput[i] || '';
                this.elements.letterCells.appendChild(cell);
            }
        }

        this.elements.availableLetters.innerHTML = '';

        this.availableLetters.forEach((letter, index) => {
            const btn = document.createElement('div');
            btn.className = `letter-btn ${this.usedLetters.includes(index) ? 'used' : ''}`;
            btn.textContent = letter;
            btn.dataset.index = index;

            if (!this.usedLetters.includes(index)) {
                // Enhanced mobile touch handling
                this.addMobileTouchHandling(btn, () => this.handleLetterClick(letter, index));
            }

            this.elements.availableLetters.appendChild(btn);
        });
    }

    // Add mobile-specific touch handling
    addMobileTouchHandling(element, callback) {
        let touchStartTime = 0;
        let touchStartY = 0;
        let touchStartX = 0;
        let isTouchMoved = false;

        // Handle both click and touch events for better mobile responsiveness
        const handleInteraction = (event) => {
            // Prevent default behavior to avoid double-triggering
            event.preventDefault();
            event.stopPropagation();

            // Add visual feedback
            element.style.transform = 'scale(0.95)';
            element.style.background = '#d0d0d0';

            // Execute callback after a short delay for better visual feedback
            setTimeout(() => {
                callback();
                // Reset visual state
                element.style.transform = '';
                element.style.background = '';
            }, 50);
        };

        // Touch event handling for mobile
        element.addEventListener('touchstart', (event) => {
            touchStartTime = Date.now();
            touchStartY = event.touches[0].clientY;
            touchStartX = event.touches[0].clientX;
            isTouchMoved = false;

            // Prevent zoom on double tap
            event.preventDefault();
        }, { passive: false });

        element.addEventListener('touchmove', (event) => {
            const touchY = event.touches[0].clientY;
            const touchX = event.touches[0].clientX;
            const deltaY = Math.abs(touchY - touchStartY);
            const deltaX = Math.abs(touchX - touchStartX);

            // If touch moved significantly, mark as moved
            if (deltaY > 10 || deltaX > 10) {
                isTouchMoved = true;
            }
        });

        element.addEventListener('touchend', (event) => {
            const touchEndTime = Date.now();
            const touchDuration = touchEndTime - touchStartTime;

            // Only trigger if touch was short and didn't move much
            if (touchDuration < 300 && !isTouchMoved) {
                handleInteraction(event);
            }
        });

        // Mouse click handling for desktop
        element.addEventListener('click', (event) => {
            // Only handle mouse clicks if not on a touch device
            if (!('ontouchstart' in window)) {
                handleInteraction(event);
            }
        });

        // Prevent context menu on long press
        element.addEventListener('contextmenu', (event) => {
            event.preventDefault();
        });
    }

    handleLetterClick(letter, index) {
        if (this.usedLetters.includes(index) || this.isUnscrambling) return;

        this.userInput += letter;
        this.usedLetters = [...this.usedLetters, index];

        this.playTypingSound();
        this.renderInputArea();

        // Save current state after each letter click
        this.saveCurrentPuzzleState();

        // For authors, check against length without spaces
        const targetLength = this.activeWord.isAuthor ?
            this.activeWord.original.replace(/\s/g, '').length :
            this.activeWord.original.length;

        if (this.userInput.length === targetLength) {
            const inputWord = this.userInput.toLowerCase();
            const targetWord = this.activeWord.original.toLowerCase();

            // For authors, remove spaces from both input and target for comparison
            const compareInput = this.activeWord.isAuthor ? inputWord : inputWord;
            const compareTarget = this.activeWord.isAuthor ? targetWord.replace(/\s/g, '') : targetWord;

            if (compareInput === compareTarget) {
                if (this.activeWord.isAuthor) {
                    this.authorSolved = true;
                    this.updateAuthorDisplay();
                    this.playAuthorCompleteSound();
                } else {
                    this.solvedWords.add(this.activeWord.original);
                    this.updateWordDisplay(this.activeWord);
                    this.playWordCompleteSound();
                }

                // Save state after word/author completion
                this.saveCurrentPuzzleState();

                setTimeout(() => {
                    this.activateNextWordSmoothly();
                }, 1200);
            } else {
                setTimeout(() => {
                    this.resetInput();
                }, 1000);
            }
        }
    }

    updateWordDisplay(wordData) {
        const wordElements = document.querySelectorAll('.quote-word');
        const targetWordEl = Array.from(wordElements).find(el =>
            el.dataset.wordIndex == wordData.index
        );

        if (targetWordEl) {
            const words = this.currentQuote.text.split(' ');
            const properWord = this.getProperCapitalization(wordData.original, wordData.index, words);

            this.animateWordCompletion(targetWordEl, properWord);
        }
    }

    updateAuthorDisplay() {
        const authorName = this.toTitleCase(this.currentQuote.author);
        this.animateAuthorCompletion(this.elements.quoteAuthor, `- ${authorName}`);
    }

    animateWordCompletion(wordElement, newText) {
        wordElement.classList.add('small-celebration');

        setTimeout(() => {
            wordElement.textContent = newText;
            wordElement.className = 'quote-word word-reveal';
            wordElement.removeAttribute('data-word-index');

            setTimeout(() => {
                wordElement.classList.remove('word-reveal');
            }, 400);
        }, 400);

        setTimeout(() => {
            wordElement.classList.remove('small-celebration');
        }, 800);
    }

    animateAuthorCompletion(authorElement, newText) {
        authorElement.classList.add('small-celebration');

        setTimeout(() => {
            authorElement.textContent = newText;
            authorElement.className = 'author word-reveal';

            setTimeout(() => {
                authorElement.classList.remove('word-reveal');
            }, 400);
        }, 400);

        setTimeout(() => {
            authorElement.classList.remove('small-celebration');
        }, 800);
    }

    async activateNextWordSmoothly() {
        document.querySelectorAll('.quote-word.active, .author.active').forEach(el => {
            el.classList.remove('active');
        });

        this.activeWord = null;
        this.userInput = '';
        this.availableLetters = [];
        this.usedLetters = [];
        this.renderInputArea();

        if (this.solvedWords.size === this.currentQuote.scrambledWords.length && this.authorSolved) {
            this.gameComplete = true;

            // Record the puzzle completion FIRST, then update stats
            await this.recordPuzzleCompletion();
            await this.updateCongratsStats();

            this.elements.congrats.classList.add('show');
            document.querySelector('.newspaper-container').classList.add('puzzle-complete');

            // Set up congrats buttons after showing the section
            setTimeout(() => {
                this.setupCongratsButtons();
            }, 100);

            // Also set up event delegation as backup
            this.setupCongratsEventDelegation();

            this.playQuoteCompleteSound();

            const quoteContainer = document.querySelector('.quote-container');
            quoteContainer.classList.add('puzzle-completed', 'quote-complete');
            setTimeout(() => {
                quoteContainer.classList.remove('puzzle-completed');
            }, 1000);

            return;
        }

        if (!this.authorSolved && this.solvedWords.size === this.currentQuote.scrambledWords.length) {
            setTimeout(() => {
                this.activateAuthorSmoothly();
            }, 300);
        } else {
            for (const word of this.currentQuote.scrambledWords) {
                if (!this.solvedWords.has(word.original)) {
                    setTimeout(() => {
                        this.activateWordSmoothly(word);
                    }, 300);
                    return;
                }
            }
        }
    }

    activateWordSmoothly(wordData) {
        if (this.solvedWords.has(wordData.original)) return;

        this.activeWord = wordData;
        this.userInput = '';
        this.availableLetters = wordData.scrambled.split('');
        this.usedLetters = [];

        this.renderInputArea();

        const wordElements = document.querySelectorAll('.quote-word.scrambled');
        const targetWordEl = Array.from(wordElements).find(el =>
            el.dataset.wordIndex == wordData.index
        );

        document.querySelectorAll('.quote-word.active, .author.active').forEach(el => {
            el.classList.remove('active');
        });

        if (targetWordEl) {
            targetWordEl.classList.add('active');
        }

        // Check unscramble cooldown when new word is activated
        this.checkUnscrambleCooldown();
    }

    activateAuthorSmoothly() {
        if (this.authorSolved) return;

        this.activeWord = {
            original: this.currentQuote.author.toLowerCase(),
            scrambled: this.currentQuote.scrambledAuthor,
            isAuthor: true
        };

        this.userInput = '';

        // For authors, keep all letters together without spaces and track word structure
        this.availableLetters = this.currentQuote.scrambledAuthor.replace(/\s/g, '').split('');
        this.authorWordStructure = this.currentQuote.author.split(' ').map(word => word.length);
        this.usedLetters = [];

        this.renderInputArea();

        document.querySelectorAll('.quote-word.active, .author.active').forEach(el => {
            el.classList.remove('active');
        });

        const authorEl = document.querySelector('.author.scrambled');
        if (authorEl) {
            authorEl.classList.add('active');
        }

        // Check unscramble cooldown when author is activated
        this.checkUnscrambleCooldown();
    }

    handleKeyDown(event) {
        if (!this.activeWord || this.availableLetters.length === 0 || this.isUnscrambling) return;

        if (event.key === 'Backspace') {
            this.handleBackspace();
            return;
        }

        if (event.key.length !== 1) return;

        const key = event.key.toLowerCase();
        const availableIndex = this.availableLetters.findIndex((letter, index) =>
            letter.toLowerCase() === key && !this.usedLetters.includes(index)
        );

        if (availableIndex !== -1) {
            this.handleLetterClick(this.availableLetters[availableIndex], availableIndex);
        }
    }

    handleBackspace() {
        console.log('⌨️ Backspace triggered');
        if (!this.activeWord || this.userInput.length === 0 || this.isUnscrambling) {
            console.log('❌ Backspace blocked - no active word, no input, or unscrambling');
            return;
        }

        console.log('✅ Backspace allowed, playing sound');
        this.playBackspaceSound();
        this.userInput = this.userInput.length > 0 ? this.userInput.slice(0, -1) : '';
        this.usedLetters = this.usedLetters.length > 0 ? this.usedLetters.slice(0, -1) : [];
        this.renderInputArea();

        // Save current state after backspace
        this.saveCurrentPuzzleState();
    }

    resetInput() {
        if (this.isUnscrambling) return;

        this.playResetSound();
        this.userInput = '';
        this.usedLetters = [];
        this.renderInputArea();

        // Save current state after reset
        this.saveCurrentPuzzleState();
    }

    startUnscrambleCooldown() {
        this.unscrambleLastUsed = Date.now();
        this.elements.unscrambleBtn.disabled = true;
        this.elements.unscrambleBtn.style.opacity = '0.5';

        // Show timer
        if (this.elements.unscrambleTimer) {
            this.elements.unscrambleTimer.classList.add('show');
        }

        // Clear any existing interval
        if (this.unscrambleCooldownInterval) {
            clearInterval(this.unscrambleCooldownInterval);
        }

        // Start the cooldown progress
        this.unscrambleCooldownInterval = setInterval(() => {
            const elapsed = Date.now() - this.unscrambleLastUsed;
            const progress = Math.min(elapsed / this.unscrambleCooldown, 1);

            if (progress >= 1) {
                // Cooldown complete
                this.elements.unscrambleBtn.disabled = false;
                this.elements.unscrambleBtn.style.opacity = '1';
                if (this.elements.unscrambleTimer) {
                    this.elements.unscrambleTimer.classList.remove('show');
                    this.elements.unscrambleTimer.textContent = '';
                }
                clearInterval(this.unscrambleCooldownInterval);
                this.unscrambleCooldownInterval = null;
            } else {
                // Update visual progress and timer
                this.elements.unscrambleBtn.style.opacity = 0.5 + (progress * 0.5);

                // Update timer display
                if (this.elements.unscrambleTimer) {
                    const remainingTime = Math.ceil((this.unscrambleCooldown - elapsed) / 1000);
                    this.elements.unscrambleTimer.textContent = `${remainingTime}s`;
                }
            }
        }, 100); // Update every 100ms for smooth progress
    }

    checkUnscrambleCooldown() {
        const timeSinceLastUse = Date.now() - this.unscrambleLastUsed;
        const progress = Math.min(timeSinceLastUse / this.unscrambleCooldown, 1);

        if (progress >= 1) {
            // Cooldown complete
            this.elements.unscrambleBtn.disabled = false;
            this.elements.unscrambleBtn.style.opacity = '1';
            if (this.elements.unscrambleTimer) {
                this.elements.unscrambleTimer.classList.remove('show');
                this.elements.unscrambleTimer.textContent = '';
            }
            if (this.unscrambleCooldownInterval) {
                clearInterval(this.unscrambleCooldownInterval);
                this.unscrambleCooldownInterval = null;
            }
        } else {
            // Still in cooldown
            this.elements.unscrambleBtn.disabled = true;
            this.elements.unscrambleBtn.style.opacity = 0.5 + (progress * 0.5);

            // Show and update timer
            if (this.elements.unscrambleTimer) {
                this.elements.unscrambleTimer.classList.add('show');
                const remainingTime = Math.ceil((this.unscrambleCooldown - timeSinceLastUse) / 1000);
                this.elements.unscrambleTimer.textContent = `${remainingTime}s`;
            }

            // Restart the interval if it's not running
            if (!this.unscrambleCooldownInterval) {
                this.unscrambleCooldownInterval = setInterval(() => {
                    this.checkUnscrambleCooldown();
                }, 100);
            }
        }
    }

    async unscrambleCurrentWord() {
        if (!this.activeWord || this.isUnscrambling) return;

        // Check cooldown
        const timeSinceLastUse = Date.now() - this.unscrambleLastUsed;
        if (timeSinceLastUse < this.unscrambleCooldown) {
            return; // Still in cooldown
        }

        // Show rewarded ad before unscrambling
        try {
            console.log('🎬 Showing rewarded ad for unscramble...');

            // Track unscramble attempt
            this.arkadium.trackEvent('unscramble_attempted', {
                word: this.activeWord.original,
                isAuthor: this.activeWord.isAuthor
            });

            await this.arkadium.showRewardedAd();
            console.log('✅ Rewarded ad completed, proceeding with unscramble');

            // Track successful unscramble
            this.arkadium.trackEvent('unscramble_completed', {
                word: this.activeWord.original,
                isAuthor: this.activeWord.isAuthor
            });

        } catch (error) {
            console.log('❌ Rewarded ad failed or was cancelled:', error);
            // In development mode or if ad fails, still allow unscramble
            if (!this.arkadium.isDevelopmentMode()) {
                console.log('🎮 Ad failed, but allowing unscramble in development mode');
            }

            // Track unscramble without ad
            this.arkadium.trackEvent('unscramble_no_ad', {
                word: this.activeWord.original,
                isAuthor: this.activeWord.isAuthor,
                error: error.message
            });
        }

        this.isUnscrambling = true;
        this.elements.resetBtn.disabled = true;
        this.elements.backspaceBtn.disabled = true;
        this.elements.unscrambleBtn.disabled = true;

        // Start the cooldown
        this.startUnscrambleCooldown();

        const targetWord = this.activeWord.isAuthor ?
            this.activeWord.original.replace(/\s/g, '') :
            this.activeWord.original;
        const scrambledLetters = this.activeWord.isAuthor ?
            this.activeWord.scrambled.replace(/\s/g, '').split('') :
            this.activeWord.scrambled.split('');

        this.userInput = '';
        this.usedLetters = [];

        let letterIndex = 0;
        let attempts = 0;
        const maxAttempts = targetWord.length * 2; // Safety limit

        const addNextLetter = () => {
            if (letterIndex >= targetWord.length) {
                // Word is complete, check if it's correct
                const inputWord = this.userInput.toLowerCase();
                const targetWordLower = this.activeWord.isAuthor ?
                    this.activeWord.original.toLowerCase().replace(/\s/g, '') :
                    this.activeWord.original.toLowerCase();

                if (inputWord === targetWordLower) {
                    setTimeout(() => {
                        if (this.activeWord.isAuthor) {
                            this.authorSolved = true;
                            this.updateAuthorDisplay();
                            this.playAuthorCompleteSound();
                        } else {
                            this.solvedWords.add(this.activeWord.original);
                            this.updateWordDisplay(this.activeWord);
                            this.playWordCompleteSound();
                        }

                        setTimeout(() => {
                            this.isUnscrambling = false;
                            this.elements.resetBtn.disabled = false;
                            this.elements.backspaceBtn.disabled = false;
                            // Don't re-enable unscramble button here - let cooldown handle it
                            this.activateNextWordSmoothly();
                        }, 1200);
                    }, 300);
                } else {
                    // Word is wrong, reset and try again
                    this.userInput = '';
                    this.usedLetters = [];
                    letterIndex = 0;
                    attempts++;

                    if (attempts < maxAttempts) {
                        setTimeout(addNextLetter, 200);
                    } else {
                        // Give up and reset
                        this.isUnscrambling = false;
                        this.elements.resetBtn.disabled = false;
                        this.elements.backspaceBtn.disabled = false;
                        // Don't re-enable unscramble button here - let cooldown handle it
                        this.resetInput();
                    }
                }
                return;
            }

            attempts++;
            if (attempts > maxAttempts) {
                // Safety timeout - give up
                this.isUnscrambling = false;
                this.elements.resetBtn.disabled = false;
                this.elements.backspaceBtn.disabled = false;
                // Don't re-enable unscramble button here - let cooldown handle it
                this.resetInput();
                return;
            }

            const targetLetter = targetWord[letterIndex];
            const scrambledIndex = scrambledLetters.findIndex((letter, index) =>
                letter.toLowerCase() === targetLetter.toLowerCase() && !this.usedLetters.includes(index)
            );

            if (scrambledIndex !== -1) {
                this.userInput += scrambledLetters[scrambledIndex];
                this.usedLetters = [...this.usedLetters, scrambledIndex];
                this.playTypingSound();
                this.renderInputArea();

                letterIndex++;
                setTimeout(addNextLetter, 200);
            } else {
                // Letter not found, try to find any available letter
                const availableIndex = scrambledLetters.findIndex((letter, index) =>
                    !this.usedLetters.includes(index)
                );

                if (availableIndex !== -1) {
                    this.userInput += scrambledLetters[availableIndex];
                    this.usedLetters = [...this.usedLetters, availableIndex];
                    this.playTypingSound();
                    this.renderInputArea();

                    letterIndex++;
                    setTimeout(addNextLetter, 200);
                } else {
                    // No more letters available, reset and try again
                    this.userInput = '';
                    this.usedLetters = [];
                    letterIndex = 0;
                    setTimeout(addNextLetter, 200);
                }
            }
        };

        addNextLetter();
    }

    async renderCalendar() {
        const today = new Date();
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];

        this.elements.calendarMonthYear.textContent =
            `${monthNames[this.currentCalendarMonth]} ${this.currentCalendarYear}`;

        const firstDay = new Date(this.currentCalendarYear, this.currentCalendarMonth, 1);
        const lastDay = new Date(this.currentCalendarYear, this.currentCalendarMonth + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        let html = '';

        for (let i = 0; i < startingDayOfWeek; i++) {
            html += '<div class="calendar-date"></div>';
        }

        const userData = await this.loadUserData();
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(this.currentCalendarYear, this.currentCalendarMonth, day);
            const dateStr = this.formatDate(date);
            const isToday = dateStr === this.formatDate(today);
            const isPast = date < today;
            const isFuture = date > today;

            let classes = 'calendar-date';
            if (isToday) classes += ' today';
            else if (isPast) classes += ' past';
            else if (isFuture) classes += ' future';

            if (userData.puzzles && userData.puzzles[dateStr] && userData.puzzles[dateStr].solved) {
                classes += ' solved';
            }

            const quote = this.quotes.find(q => q.date === dateStr);
            if (quote) {
                html += `<div class="${classes}" data-date="${dateStr}" style="cursor: pointer;" title="Play ${dateStr} puzzle">${day}</div>`;
            } else {
                html += `<div class="${classes}" style="opacity: 0.3;" title="No puzzle available">${day}</div>`;
            }
        }

        this.elements.calendarDates.innerHTML = html;

        document.querySelectorAll('.calendar-date[data-date]').forEach(el => {
            el.addEventListener('click', async () => {
                const dateStr = el.dataset.date;
                const clickedDate = new Date(dateStr);
                const today = new Date();
                const todayStr = this.formatDate(today);

                // Prevent clicking on future dates
                if (clickedDate > today) {
                    return; // Do nothing for future dates
                }

                // Hide congrats section when selecting any date from calendar
                this.elements.congrats.classList.remove('show');
                document.querySelector('.newspaper-container').classList.remove('puzzle-complete');

                // If clicking on today's date, load today's puzzle properly
                if (dateStr === todayStr) {
                    this.currentQuote = this.findTodayQuote();
                    this.solvedWords = new Set();
                    this.authorSolved = false;
                    this.activeWord = null;
                    this.userInput = '';
                    this.availableLetters = [];
                    this.usedLetters = [];
                    this.gameComplete = false;
                    this.startTime = new Date();

                    // Hide completed challenge buttons for today's puzzle
                    this.hideCompletedChallengeButtons();

                    // Check if today's puzzle is completed and show congrats if so
                    await this.checkQuoteCompletionStatus();

                    this.renderQuote();
                    this.updateDateDisplay();
                    this.renderInputArea();
                } else {
                    // Load past challenge (without congrats/stats)
                    await this.loadChallengeForDate(dateStr);
                }

                this.elements.calendarModal.style.display = 'none';
            });
        });

        this.updateCalendarNavigation();
    }

    updateCalendarNavigation() {
        const today = new Date();
        const quoteDates = this.quotes.map(q => new Date(q.date));
        const earliestDate = new Date(Math.min(...quoteDates));
        const latestDate = new Date(Math.max(...quoteDates));

        const currentViewDate = new Date(this.currentCalendarYear, this.currentCalendarMonth, 1);
        const earliestViewDate = new Date(earliestDate.getFullYear(), earliestDate.getMonth(), 1);
        this.elements.prevMonth.disabled = currentViewDate <= earliestViewDate;

        const currentMonthDate = new Date(today.getFullYear(), today.getMonth(), 1);
        this.elements.nextMonth.disabled = currentViewDate >= currentMonthDate;
    }

    showCompletedChallengeButtons(dateStr) {
        // Create or update the button bar for completed challenges
        let buttonBar = document.getElementById('completedChallengeButtons');
        if (!buttonBar) {
            buttonBar = document.createElement('div');
            buttonBar.id = 'completedChallengeButtons';
            buttonBar.className = 'completed-challenge-buttons';

            // Insert after the quote container
            const quoteContainer = document.querySelector('.quote-container');
            quoteContainer.parentNode.insertBefore(buttonBar, quoteContainer.nextSibling);
        }

        buttonBar.innerHTML = `
            <div class="button-group">
                <button class="btn" id="pastChallengesFromCompleted">
                    <i class="fas fa-calendar-alt"></i> Past Challenges
                </button>
                <button class="btn" id="shareQuoteBtn">
                    <i class="fas fa-share"></i> Share Quote
                </button>
            </div>
        `;

        buttonBar.style.display = 'block';

        // Add event listeners
        document.getElementById('pastChallengesFromCompleted').addEventListener('click', async () => {
            this.elements.calendarModal.style.display = 'flex';
            await this.renderCalendar();
            this.playButtonClickSound();
        });

        document.getElementById('shareQuoteBtn').addEventListener('click', () => {
            this.shareQuote(dateStr);
            this.playButtonClickSound();
        });
    }

    hideCompletedChallengeButtons() {
        const buttonBar = document.getElementById('completedChallengeButtons');
        if (buttonBar) {
            buttonBar.style.display = 'none';
        }
    }

    shareQuote(dateStr) {
        console.log('📤 shareQuote called with dateStr:', dateStr);
        
        const quote = this.currentQuote;
        if (!quote) {
            console.error('❌ No current quote available for sharing');
            return;
        }
        
        console.log('📝 Sharing puzzle for date:', dateStr);
        
        const shareUrl = `${window.location.origin}${window.location.pathname}?challenge=${dateStr}`;
        
        // Create a teaser message without revealing the quote or author
        const teaserMessages = [
            `🧩 Can you unscramble today's inspirational quote?\n\nTest your word puzzle skills with this daily quote challenge!`,
            `🎯 Think you're good with words? Try this quote puzzle!\n\nUnscramble the wisdom - can you solve it?`,
            `💭 A famous quote awaits your puzzle-solving skills!\n\nCan you unscramble the scrambled words?`,
            `🔤 Word puzzle challenge: Unscramble the inspirational quote!\n\nPut your vocabulary to the test!`,
            `✨ Hidden wisdom in scrambled words...\n\nCan you reveal the inspirational quote?`
        ];
        
        // Use date to pick a consistent message for the same day
        const messageIndex = new Date(dateStr).getDate() % teaserMessages.length;
        const shareText = teaserMessages[messageIndex];

        console.log('🔗 Share URL:', shareUrl);
        console.log('📄 Share text:', shareText);

        // Try native sharing first (mobile devices)
        if (navigator.share) {
            console.log('📱 Using native sharing');
            navigator.share({
                title: 'Daily Quote Puzzle Challenge',
                text: shareText,
                url: shareUrl
            }).catch(err => {
                console.log('❌ Native sharing failed, falling back to clipboard:', err);
                this.fallbackShare(shareText, shareUrl);
            });
        } else {
            console.log('💻 Using fallback sharing (no native share API)');
            // Fallback for desktop browsers
            this.fallbackShare(shareText, shareUrl);
        }
    }

    fallbackShare(shareText, shareUrl) {
        console.log('📋 fallbackShare called');
        const fullShareText = `${shareText}\n${shareUrl}`;

        // Try to copy to clipboard
        if (navigator.clipboard) {
            console.log('📋 Attempting to copy to clipboard');
            navigator.clipboard.writeText(fullShareText).then(() => {
                console.log('✅ Successfully copied to clipboard');
                this.showShareSuccess('Link copied to clipboard!');
            }).catch((error) => {
                console.log('❌ Clipboard copy failed, showing dialog:', error);
                this.showShareDialog(fullShareText);
            });
        } else {
            console.log('❌ No clipboard API, showing dialog');
            this.showShareDialog(fullShareText);
        }
    }

    showShareSuccess(message) {
        console.log('✅ Showing share success:', message);
        
        // Create a temporary success message
        const successDiv = document.createElement('div');
        successDiv.className = 'share-success';
        successDiv.textContent = message;
        successDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #28a745;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            z-index: 10000;
            font-size: 16px;
            font-weight: bold;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            animation: fadeIn 0.3s ease-in;
        `;

        document.body.appendChild(successDiv);

        setTimeout(() => {
            successDiv.style.opacity = '0';
            successDiv.style.transition = 'opacity 0.3s ease-out';
            setTimeout(() => {
                if (successDiv.parentNode) {
                    successDiv.remove();
                }
            }, 300);
        }, 2000);
    }

    showShareDialog(shareText) {
        // Create a modal with the share text for manual copying
        const modal = document.createElement('div');
        modal.className = 'share-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        `;

        modal.innerHTML = `
            <div class="share-modal-content" style="
                background: white;
                padding: 30px;
                border-radius: 8px;
                max-width: 500px;
                width: 90%;
                text-align: center;
            ">
                <h3 style="margin-bottom: 20px;">Share This Puzzle Challenge</h3>
                <textarea readonly style="
                    width: 100%;
                    height: 120px;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-family: inherit;
                    font-size: 14px;
                    resize: none;
                    margin-bottom: 20px;
                ">${shareText}</textarea>
                <div>
                    <button class="btn" onclick="this.parentElement.parentElement.parentElement.remove()">
                        Close
                    </button>
                    <button class="btn" style="margin-left: 10px;" onclick="
                        this.parentElement.previousElementSibling.select();
                        document.execCommand('copy');
                        this.textContent = 'Copied!';
                        setTimeout(() => this.textContent = 'Copy Text', 1000);
                    ">
                        Copy Text
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    async loadChallengeForDate(dateStr) {
        const quote = this.quotes.find(q => q.date === dateStr);
        if (quote) {
            this.currentQuote = quote;

            // Check if this quote is already completed
            const userData = await this.loadUserData();
            const puzzleData = userData.puzzles[dateStr];

            if (puzzleData && puzzleData.solved) {
                // Quote is already completed, show just the quote without stats or congrats
                this.gameComplete = true;
                this.solvedWords = new Set(puzzleData.solvedWords || []);
                this.authorSolved = puzzleData.authorSolved || false;
                this.gameTime = puzzleData.time || 0;
                this.startTime = new Date(dateStr);
                this.endTime = new Date(dateStr); // Use original completion time

                this.renderQuote();
                this.updateDateDisplay();

                // Hide input area and congrats for completed past challenges
                this.elements.inputArea.classList.remove('show');
                this.elements.congrats.classList.remove('show');
                document.querySelector('.newspaper-container').classList.remove('puzzle-complete');

                const quoteContainer = document.querySelector('.quote-container');
                quoteContainer.classList.add('quote-complete');

                // Show action buttons for completed challenges
                this.showCompletedChallengeButtons(dateStr);

                // Disable all interactive elements for completed challenges
                this.disableInteractiveElements();
            } else {
                // Check for saved state for this specific puzzle
                const savedState = await this.loadCurrentPuzzleState();
                const shouldRestoreState = savedState && savedState.date === dateStr;

                if (shouldRestoreState) {
                    // Restore saved state
                    console.log('🔄 Restoring saved state for puzzle:', dateStr);
                    this.solvedWords = new Set(savedState.solvedWords || []);
                    this.authorSolved = savedState.authorSolved || false;
                    this.gameComplete = savedState.gameComplete || false;
                    this.userInput = savedState.userInput || '';
                    this.usedLetters = savedState.usedLetters || [];

                    // Find the active word if it was saved
                    if (savedState.activeWord) {
                        this.activeWord = this.currentQuote.scrambledWords.find(
                            sw => sw.original === savedState.activeWord
                        ) || this.currentQuote.scrambledWords.find(
                            sw => !this.solvedWords.has(sw.original)
                        );
                    } else {
                        this.activeWord = null;
                    }

                    this.startTime = new Date();

                    this.elements.congrats.classList.remove('show');
                    document.querySelector('.newspaper-container').classList.remove('puzzle-complete');
                    this.hideCompletedChallengeButtons();
                    this.renderQuote();
                    this.updateDateDisplay();
                    this.renderInputArea();

                    // Enable interactive elements
                    this.enableInteractiveElements();

                    // Auto-activate first unsolved word if no active word
                    if (!this.activeWord && this.currentQuote.scrambledWords.length > 0) {
                        const firstUnsolved = this.currentQuote.scrambledWords.find(
                            sw => !this.solvedWords.has(sw.original)
                        );
                        if (firstUnsolved) {
                            setTimeout(() => {
                                this.handleWordClick(firstUnsolved);
                            }, 300);
                        }
                    }
                } else {
                    // Quote is not completed and no saved state, start fresh
                    this.solvedWords = new Set();
                    this.authorSolved = false;
                    this.activeWord = null;
                    this.userInput = '';
                    this.availableLetters = [];
                    this.usedLetters = [];
                    this.gameComplete = false;
                    this.startTime = new Date();

                    this.elements.congrats.classList.remove('show');
                    document.querySelector('.newspaper-container').classList.remove('puzzle-complete');
                    this.hideCompletedChallengeButtons();
                    this.renderQuote();
                    this.updateDateDisplay();
                    this.renderInputArea();

                    // Enable interactive elements for new challenges
                    this.enableInteractiveElements();

                    if (this.currentQuote.scrambledWords.length > 0) {
                        setTimeout(() => {
                            this.handleWordClick(this.currentQuote.scrambledWords[0]);
                        }, 300);
                    }
                }
            }
        }
    }

    disableInteractiveElements() {
        // Disable letter buttons
        const letterButtons = document.querySelectorAll('.letter-btn');
        letterButtons.forEach(btn => {
            btn.style.pointerEvents = 'none';
            btn.style.opacity = '0.6';
        });

        // Disable control buttons
        if (this.elements.resetBtn) this.elements.resetBtn.disabled = true;
        if (this.elements.backspaceBtn) this.elements.backspaceBtn.disabled = true;
        if (this.elements.unscrambleBtn) this.elements.unscrambleBtn.disabled = true;

        // Disable word clicking
        const wordElements = document.querySelectorAll('.quote-word.scrambled, .author.scrambled');
        wordElements.forEach(el => {
            el.style.pointerEvents = 'none';
            el.style.cursor = 'default';
        });
    }

    enableInteractiveElements() {
        // Enable letter buttons
        const letterButtons = document.querySelectorAll('.letter-btn');
        letterButtons.forEach(btn => {
            btn.style.pointerEvents = 'auto';
            btn.style.opacity = '1';
        });

        // Enable control buttons
        if (this.elements.resetBtn) this.elements.resetBtn.disabled = false;
        if (this.elements.backspaceBtn) this.elements.backspaceBtn.disabled = false;
        if (this.elements.unscrambleBtn) this.elements.unscrambleBtn.disabled = false;

        // Enable word clicking
        const wordElements = document.querySelectorAll('.quote-word.scrambled, .author.scrambled');
        wordElements.forEach(el => {
            el.style.pointerEvents = 'auto';
            el.style.cursor = 'pointer';
        });
    }

    // Hamburger Menu Methods
    openMenu() {
        if (this.elements.slideMenu && this.elements.menuOverlay && this.elements.hamburgerMenu) {
            this.elements.slideMenu.classList.add('active');
            this.elements.menuOverlay.classList.add('active');
            this.elements.hamburgerMenu.querySelector('.hamburger-icon').classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }

    closeMenu() {
        if (this.elements.slideMenu && this.elements.menuOverlay && this.elements.hamburgerMenu) {
            this.elements.slideMenu.classList.remove('active');
            this.elements.menuOverlay.classList.remove('active');
            this.elements.hamburgerMenu.querySelector('.hamburger-icon').classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    }

    toggleMenu() {
        if (this.elements.slideMenu && this.elements.slideMenu.classList.contains('active')) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    setupEventListeners() {
        // Debug: Check if elements exist
        console.log('Setting up event listeners...');
        console.log('Elements found:', {
            resetBtn: !!this.elements.resetBtn,
            backspaceBtn: !!this.elements.backspaceBtn,
            unscrambleBtn: !!this.elements.unscrambleBtn,
            hamburgerMenu: !!this.elements.hamburgerMenu,
            slideMenu: !!this.elements.slideMenu,
            menuOverlay: !!this.elements.menuOverlay,
            helpIcon: !!this.elements.helpIcon,
            calendarIcon: !!this.elements.calendarIcon,
            statsIcon: !!this.elements.statsIcon,
            settingsIcon: !!this.elements.settingsIcon
        });

        // Hamburger Menu Controls with mobile touch handling
        if (this.elements.hamburgerMenu) {
            this.addMobileTouchHandling(this.elements.hamburgerMenu, () => {
                this.toggleMenu();
                this.playButtonClickSound();
            });
        }

        if (this.elements.closeMenu) {
            this.addMobileTouchHandling(this.elements.closeMenu, () => {
                this.closeMenu();
                this.playButtonClickSound();
            });
        }

        if (this.elements.menuOverlay) {
            this.elements.menuOverlay.addEventListener('click', () => {
                this.closeMenu();
            });
        }

        // Menu Navigation Links with mobile touch handling
        if (this.elements.menuStatsLink) {
            this.addMobileTouchHandling(this.elements.menuStatsLink, async () => {
                this.closeMenu();
                await this.updateStatsDisplay();
                this.elements.statsModal.style.display = 'flex';
                this.playButtonClickSound();
            });
        }

        if (this.elements.menuCalendarLink) {
            this.addMobileTouchHandling(this.elements.menuCalendarLink, async () => {
                this.closeMenu();
                this.elements.calendarModal.style.display = 'flex';
                await this.renderCalendar();
                this.playButtonClickSound();
            });
        }

        if (this.elements.menuHelpLink) {
            this.addMobileTouchHandling(this.elements.menuHelpLink, () => {
                this.closeMenu();
                this.elements.helpModal.style.display = 'flex';
                this.playButtonClickSound();
            });
        }

        if (this.elements.menuTestPersistenceLink) {
            this.addMobileTouchHandling(this.elements.menuTestPersistenceLink, async () => {
                this.closeMenu();
                await this.testPersistence();
                this.playButtonClickSound();
            });
        }

        // Music selection disabled
        if (this.elements.menuChangeSongLink) {
            // this.addMobileTouchHandling(this.elements.menuChangeSongLink, () => {
            //     this.closeMenu();
            //     this.showMusicSelection();
            //     this.playButtonClickSound();
            // });
        }

        // Menu Settings Toggles
        if (this.elements.menuSoundEffectsToggle) {
            this.elements.menuSoundEffectsToggle.addEventListener('change', (e) => {
                this.soundEffectsEnabled = e.target.checked;
                // Sync with old toggle if it exists
                if (this.elements.soundEffectsToggle) {
                    this.elements.soundEffectsToggle.checked = e.target.checked;
                }
                this.saveSettings();
                this.playButtonClickSound();
            });
        }

        if (this.elements.menuBackgroundMusicToggle) {
            this.elements.menuBackgroundMusicToggle.addEventListener('change', (e) => {
                this.backgroundMusicEnabled = e.target.checked;
                // Sync with old toggle if it exists
                if (this.elements.backgroundMusicToggle) {
                    this.elements.backgroundMusicToggle.checked = e.target.checked;
                }
                this.toggleBackgroundMusic();
                this.saveSettings();
                this.playButtonClickSound();
            });
        }

        // Game controls with mobile touch handling
        if (this.elements.resetBtn) {
            this.addMobileTouchHandling(this.elements.resetBtn, () => this.resetInput());
        }
        if (this.elements.backspaceBtn) {
            this.addMobileTouchHandling(this.elements.backspaceBtn, () => this.handleBackspace());
        }
        if (this.elements.unscrambleBtn) {
            this.addMobileTouchHandling(this.elements.unscrambleBtn, async () => {
                try {
                    await this.unscrambleCurrentWord();
                } catch (error) {
                    console.error('Error in unscramble:', error);
                }
            });
        }
        window.addEventListener('keydown', (e) => this.handleKeyDown(e));

        // Close menu on Escape key
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.elements.slideMenu && this.elements.slideMenu.classList.contains('active')) {
                this.closeMenu();
            }
        });

        // Calendar functionality
        if (this.elements.calendarIcon) {
            this.elements.calendarIcon.addEventListener('click', async () => {
                this.elements.calendarModal.style.display = 'flex';
                await this.renderCalendar();
            });
        }

        if (this.elements.closeCalendar) {
            this.addMobileTouchHandling(this.elements.closeCalendar, () => {
                this.elements.calendarModal.style.display = 'none';
            });
        }

        if (this.elements.prevMonth) {
            this.addMobileTouchHandling(this.elements.prevMonth, async () => {
                this.currentCalendarMonth--;
                if (this.currentCalendarMonth < 0) {
                    this.currentCalendarMonth = 11;
                    this.currentCalendarYear--;
                }
                await this.renderCalendar();
            });
        }

        if (this.elements.nextMonth) {
            this.addMobileTouchHandling(this.elements.nextMonth, async () => {
                this.currentCalendarMonth++;
                if (this.currentCalendarMonth > 11) {
                    this.currentCalendarMonth = 0;
                    this.currentCalendarYear++;
                }
                await this.renderCalendar();
            });
        }

        // Help functionality with mobile touch handling
        if (this.elements.helpIcon) {
            this.addMobileTouchHandling(this.elements.helpIcon, () => {
                this.elements.helpModal.style.display = 'flex';
            });
        }

        if (this.elements.closeHelp) {
            this.addMobileTouchHandling(this.elements.closeHelp, () => {
                this.elements.helpModal.style.display = 'none';
            });
        }

        // Stats functionality with mobile touch handling
        if (this.elements.statsIcon) {
            this.addMobileTouchHandling(this.elements.statsIcon, async () => {
                await this.updateStatsDisplay();
                this.elements.statsModal.style.display = 'flex';
            });
        }

        if (this.elements.closeStats) {
            this.addMobileTouchHandling(this.elements.closeStats, () => {
                this.elements.statsModal.style.display = 'none';
            });
        }



        if (this.elements.closeSettings) {
            this.addMobileTouchHandling(this.elements.closeSettings, () => {
                this.elements.settingsModal.style.display = 'none';
            });
        }

        // Music selection functionality disabled
        // console.log('🎵 Change song button found:', !!this.elements.changeSongBtn);
        // if (this.elements.changeSongBtn) {
        //     this.addMobileTouchHandling(this.elements.changeSongBtn, () => {
        //         console.log('🎵 Change song clicked!');
        //         this.showMusicSelection();
        //     });
        // }

        // if (this.elements.closeMusicSelection) {
        //     this.addMobileTouchHandling(this.elements.closeMusicSelection, () => {
        //         this.closeMusicSelection();
        //     });
        // }

        // Settings toggle listeners
        if (this.elements.soundEffectsToggle) {
            this.elements.soundEffectsToggle.addEventListener('change', (e) => {
                this.soundEffectsEnabled = e.target.checked;
                this.saveSettings();
            });
        }

        if (this.elements.backgroundMusicToggle) {
            this.elements.backgroundMusicToggle.addEventListener('change', (e) => {
                this.backgroundMusicEnabled = e.target.checked;
                this.toggleBackgroundMusic();
                this.saveSettings();
            });
        }

        // Close modals when clicking outside
        document.addEventListener('click', (e) => {
            if (this.elements.calendarModal && e.target === this.elements.calendarModal) {
                this.elements.calendarModal.style.display = 'none';
            }
            if (this.elements.helpModal && e.target === this.elements.helpModal) {
                this.elements.helpModal.style.display = 'none';
            }
            if (this.elements.statsModal && e.target === this.elements.statsModal) {
                this.elements.statsModal.style.display = 'none';
            }
            if (this.elements.settingsModal && e.target === this.elements.settingsModal) {
                this.elements.settingsModal.style.display = 'none';
            }
            const pastChallengesModal = document.getElementById('pastChallengesModal');
            if (pastChallengesModal && e.target === pastChallengesModal) {
                this.closePastChallengesModal();
            }
        });

        // Set up congrats buttons (will be called when congrats is shown)
        this.setupCongratsButtons();
    }

    setupCongratsButtons() {
        console.log('🔧 Setting up congrats buttons...');

        // Use a more direct approach - wait for elements to be available
        setTimeout(() => {
            // Past challenges button
            const pastChallengesBtn = document.getElementById('pastChallengesBtn');
            console.log('🔍 Past challenges button found:', !!pastChallengesBtn);
            console.log('🔍 Button visible:', pastChallengesBtn ? window.getComputedStyle(pastChallengesBtn).display !== 'none' : false);

            if (pastChallengesBtn) {
                // Simple click event without mobile touch handling first
                pastChallengesBtn.onclick = async (e) => {
                    console.log('📅 Past challenges button clicked!');
                    e.preventDefault();
                    e.stopPropagation();

                    try {
                        this.elements.calendarModal.style.display = 'flex';
                        await this.renderCalendar();
                        this.playButtonClickSound();
                    } catch (error) {
                        console.error('Error opening calendar:', error);
                    }
                };

                // Also add addEventListener as backup
                pastChallengesBtn.addEventListener('click', async (e) => {
                    console.log('📅 Past challenges button clicked (addEventListener)!');
                }, { once: false });

                // Add hover events to test if button is receiving events
                pastChallengesBtn.addEventListener('mouseenter', () => {
                    console.log('🖱️ Mouse entered past challenges button');
                });

                pastChallengesBtn.addEventListener('mouseleave', () => {
                    console.log('🖱️ Mouse left past challenges button');
                });
            }

            // Share button
            const shareFromCongratsBtn = document.getElementById('shareFromCongratsBtn');
            console.log('🔍 Share button found:', !!shareFromCongratsBtn);
            console.log('🔍 Button visible:', shareFromCongratsBtn ? window.getComputedStyle(shareFromCongratsBtn).display !== 'none' : false);

            if (shareFromCongratsBtn) {
                // Simple click event without mobile touch handling first
                shareFromCongratsBtn.onclick = (e) => {
                    console.log('📤 Share button clicked!');
                    e.preventDefault();
                    e.stopPropagation();

                    try {
                        const today = new Date();
                        const todayStr = this.formatDate(today);
                        this.shareQuote(todayStr);
                        this.playButtonClickSound();
                    } catch (error) {
                        console.error('Error sharing quote:', error);
                    }
                };

                // Also add addEventListener as backup
                shareFromCongratsBtn.addEventListener('click', (e) => {
                    console.log('📤 Share button clicked (addEventListener)!');
                }, { once: false });

                // Add hover events to test if button is receiving events
                shareFromCongratsBtn.addEventListener('mouseenter', () => {
                    console.log('🖱️ Mouse entered share button');
                });

                shareFromCongratsBtn.addEventListener('mouseleave', () => {
                    console.log('🖱️ Mouse left share button');
                });
            }
        }, 200); // Increased delay to ensure DOM is ready
    }

    setupCongratsEventDelegation() {
        // Set up event delegation on the congrats container
        const congratsContainer = document.getElementById('congrats');
        if (congratsContainer) {
            congratsContainer.addEventListener('click', async (e) => {
                console.log('🎯 Click detected in congrats container:', e.target.id);

                if (e.target.id === 'pastChallengesBtn' || e.target.closest('#pastChallengesBtn')) {
                    console.log('📅 Past challenges clicked via delegation!');
                    e.preventDefault();
                    e.stopPropagation();

                    try {
                        this.elements.calendarModal.style.display = 'flex';
                        await this.renderCalendar();
                        this.playButtonClickSound();
                    } catch (error) {
                        console.error('Error opening calendar via delegation:', error);
                    }
                }

                if (e.target.id === 'shareFromCongratsBtn' || e.target.closest('#shareFromCongratsBtn')) {
                    console.log('📤 Share clicked via delegation!');
                    e.preventDefault();
                    e.stopPropagation();

                    try {
                        const today = new Date();
                        const todayStr = this.formatDate(today);
                        this.shareQuote(todayStr);
                        this.playButtonClickSound();
                    } catch (error) {
                        console.error('Error sharing via delegation:', error);
                    }
                }
            });
        }
    }

    async checkForSharedChallenge() {
        const urlParams = new URLSearchParams(window.location.search);
        const challengeDate = urlParams.get('challenge');

        if (challengeDate) {
            // Load the shared challenge
            const quote = this.quotes.find(q => q.date === challengeDate);
            if (quote) {
                console.log(`Loading shared challenge for ${challengeDate}`);
                await this.loadChallengeForDate(challengeDate);

                // Clear the URL parameter to avoid reloading on refresh
                const newUrl = window.location.pathname;
                window.history.replaceState({}, document.title, newUrl);
                return true; // Indicates a shared challenge was loaded
            }
        }
        return false; // No shared challenge
    }

    async checkQuoteCompletionStatus() {
        const today = new Date();
        const todayStr = this.formatDate(today);
        const userData = await this.loadUserData();
        const puzzleData = userData.puzzles[todayStr];

        if (puzzleData) {
            // Today's puzzle is already completed, treat it like any other completed challenge
            this.gameComplete = true;
            this.solvedWords = new Set(puzzleData.solvedWords || []);
            this.authorSolved = puzzleData.authorSolved || false;
            this.gameTime = puzzleData.time || 0;
            this.startTime = new Date(todayStr);
            this.endTime = new Date(todayStr); // Use original completion time

            // Hide input area and congrats for completed challenges (same as past challenges)
            this.elements.inputArea.classList.remove('show');
            this.elements.congrats.classList.remove('show');
            document.querySelector('.newspaper-container').classList.remove('puzzle-complete');

            const quoteContainer = document.querySelector('.quote-container');
            quoteContainer.classList.add('quote-complete');

            // Show action buttons for completed challenges (same as past challenges)
            this.showCompletedChallengeButtons(todayStr);

            // Disable interactive elements for completed challenges
            this.disableInteractiveElements();
        }
    }

    async isQuoteCompleted() {
        const today = new Date();
        const todayStr = this.formatDate(today);
        const userData = await this.loadUserData();
        return userData.puzzles[todayStr] !== undefined;
    }

    // replayChallenge method removed - no longer needed since completed challenges are view-only

    async showPastChallenges() {
        const userData = await this.loadUserData();
        const completedPuzzles = Object.entries(userData.puzzles)
            .filter(([date, puzzle]) => puzzle.solved)
            .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA));

        let challengesHtml = '<div class="past-challenges-container">';
        challengesHtml += '<h3>Past Challenges</h3>';
        challengesHtml += '<div class="challenges-list">';

        if (completedPuzzles.length === 0) {
            challengesHtml += '<p>No completed challenges yet. Start solving today\'s puzzle!</p>';
        } else {
            completedPuzzles.forEach(([date, puzzle]) => {
                const puzzleDate = new Date(date);
                const formattedDate = puzzleDate.toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                });

                challengesHtml += `
                    <div class="challenge-item" data-date="${date}">
                        <div class="challenge-date">${formattedDate}</div>
                        <div class="challenge-time">${puzzle.time}s</div>
                        <div class="challenge-status">Completed</div>
                    </div>
                `;
            });
        }

        challengesHtml += '</div></div>';

        // Create or update modal for past challenges
        let modal = document.getElementById('pastChallengesModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'pastChallengesModal';
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Past Challenges</h2>
                        <span class="close" onclick="game.closePastChallengesModal()">&times;</span>
                    </div>
                    <div class="modal-body">
                        ${challengesHtml}
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        } else {
            modal.querySelector('.modal-body').innerHTML = challengesHtml;
        }

        modal.style.display = 'flex';
    }

    closePastChallengesModal() {
        const modal = document.getElementById('pastChallengesModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    async testPersistence() {
        console.log('🧪 Testing Arkadium persistence...');

        // Test data
        const testData = {
            testKey: 'testValue',
            timestamp: new Date().toISOString(),
            gameData: {
                testScore: 100,
                testLevel: 5
            }
        };

        try {
            // Test remote save
            console.log('💾 Testing remote save...');
            const saveResult = await this.arkadium.saveRemoteData('testData', testData);
            console.log('✅ Remote save result:', saveResult);

            // Test remote load
            console.log('📂 Testing remote load...');
            const loadedData = await this.arkadium.loadRemoteData('testData');
            console.log('✅ Remote load result:', loadedData);

            // Test local save
            console.log('💾 Testing local save...');
            const localSaveResult = await this.arkadium.saveLocalData('testLocalData', testData);
            console.log('✅ Local save result:', localSaveResult);

            // Test local load
            console.log('📂 Testing local load...');
            const localLoadedData = await this.arkadium.loadLocalData('testLocalData');
            console.log('✅ Local load result:', localLoadedData);

            // Show results in alert
            const message = `Persistence Test Results:
            
Remote Save: ${saveResult ? '✅ Success' : '❌ Failed'}
Remote Load: ${loadedData ? '✅ Success' : '❌ Failed'}
Local Save: ${localSaveResult ? '✅ Success' : '❌ Failed'}
Local Load: ${localLoadedData ? '✅ Success' : '❌ Failed'}

Check console for detailed logs.`;

            alert(message);

        } catch (error) {
            console.error('❌ Persistence test failed:', error);
            alert('Persistence test failed. Check console for details.');
        }
    }

    // Music selection methods - disabled
    showMusicSelection() {
        // Music selection disabled
        console.log('🎵 Music selection is disabled');
        return;
        // this.renderMusicTracks();
        // this.elements.musicSelectionModal.style.display = 'flex';
    }

    closeMusicSelection() {
        // Music selection disabled
        return;
        // this.elements.musicSelectionModal.style.display = 'none';
    }

    renderMusicTracks() {
        // Music selection disabled
        console.log('🎵 Music tracks rendering is disabled');
        return;
    }

    async handleMusicTrackClick(card) {
        // Music selection disabled
        console.log('🎵 Music track selection is disabled');
        return;
    }

    async unlockMusicTrack(trackKey) {
        // Music selection disabled
        console.log('🎵 Music track unlocking is disabled');
        return;
    }

    selectMusicTrack(trackKey) {
        // Music selection disabled
        console.log('🎵 Music track selection is disabled');
        return;
    }

    saveMusicTracks() {
        // Music selection disabled
        console.log('🎵 Music tracks saving is disabled');
        return;
    }

    loadMusicTracks() {
        // Music selection disabled
        console.log('🎵 Music tracks loading is disabled');
        return;
    }

    // replayPastChallenge method removed - no longer needed since completed challenges are view-only
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DailyQuotePuzzle();
}); 