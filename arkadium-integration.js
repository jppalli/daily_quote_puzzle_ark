// Arkadium SDK Integration for Daily Quote Puzzle
class ArkadiumIntegration {
    constructor() {
        this.sdk = null;
        this.isInitialized = false;
        this.rewardedAdAvailable = false;
        this.onRewardedAdComplete = null;
        this.onRewardedAdFailed = null;
        this.onRewardedAdClosed = null;
        
        // Initialize SDK
        this.init();
    }
    
    async init() {
        try {
            // Check if Arkadium SDK is available
            if (typeof window.ArkadiumGameSDK === 'undefined') {
                console.warn('Arkadium SDK not found. Running in development mode.');
                this.isInitialized = true;
                return;
            }
            
            // Initialize the SDK using the correct method
            this.sdk = await window.ArkadiumGameSDK.getInstance();
            console.log('🎮 Arkadium SDK initialized successfully');
            this.isInitialized = true;
            
            // Production mode - debug disabled
            // this.sdk.debugMode(true);
            
            // Set up rewarded ads
            this.setupRewardedAds();
            
            // Notify that game is ready to be shown
            this.sdk.lifecycle.onTestReady();
            
        } catch (error) {
            console.error('❌ Error initializing Arkadium SDK:', error);
            console.log('🎮 Falling back to development mode');
            this.isInitialized = true; // Allow game to continue without ads
        }
    }
    
    setupRewardedAds() {
        if (!this.sdk) return;
        
        try {
            // Check if rewarded ads are available
            console.log('🎬 Checking rewarded ad availability...');
            this.rewardedAdAvailable = true;
            
        } catch (error) {
            console.error('❌ Error setting up rewarded ads:', error);
        }
    }
    
    async showRewardedAd() {
        return new Promise((resolve, reject) => {
            if (!this.sdk || !this.isInitialized) {
                console.log('🎮 SDK not available, allowing unscramble without ad');
                resolve(true);
                return;
            }
            
            try {
                console.log('🎬 Loading rewarded ad...');
                
                // Use the correct SDK method according to documentation
                this.sdk.ads.showRewardAd()
                    .then((response) => {
                        console.log('✅ Rewarded ad completed successfully');
                        console.log('🎁 Reward value:', response.value);
                        
                        if (response.value) {
                            resolve(true);
                        } else {
                            reject(new Error('Ad was not completed successfully'));
                        }
                    })
                    .catch((error) => {
                        console.error('❌ Rewarded ad failed:', error);
                        reject(error);
                    });
                
            } catch (error) {
                console.error('❌ Error showing rewarded ad:', error);
                reject(error);
            }
        });
    }
    
    // Check if rewarded ads are available
    isRewardedAdAvailable() {
        return this.sdk && this.isInitialized && this.rewardedAdAvailable;
    }
    
    // Development mode check
    isDevelopmentMode() {
        return typeof window.ArkadiumGameSDK === 'undefined';
    }
    
    // Get user wallet information
    async getUserWallet() {
        if (!this.sdk || !this.isInitialized) {
            return { gems: 0 };
        }
        
        try {
            return await this.sdk.wallet.getGems();
        } catch (error) {
            console.error('❌ Error getting wallet:', error);
            return { gems: 0 };
        }
    }
    
    // Consume gems from user wallet
    async consumeGems(amount) {
        if (!this.sdk || !this.isInitialized) {
            console.log('🎮 SDK not available, simulating gem consumption');
            return true;
        }
        
        try {
            return await this.sdk.wallet.consumeGems(amount);
        } catch (error) {
            console.error('❌ Error consuming gems:', error);
            return false;
        }
    }
    
    // Show banner ad
    showBannerAd(adId, dimensions = null) {
        if (!this.sdk || !this.isInitialized) {
            console.log('🎮 SDK not available, banner ad not shown');
            return;
        }
        
        try {
            // Use default dimensions if none provided
            const adDimensions = dimensions || [this.sdk.ads.bannerSizes.AD_300x250];
            console.log('📢 Showing banner ad...');
            this.sdk.ads.showBannerAd(adId, adDimensions);
        } catch (error) {
            console.error('❌ Error showing banner ad:', error);
        }
    }
    
    // Show interstitial ad
    async showInterstitialAd(duration = 30) {
        if (!this.sdk || !this.isInitialized) {
            console.log('🎮 SDK not available, interstitial ad not shown');
            return;
        }
        
        try {
            console.log('🎬 Showing interstitial ad...');
            await this.sdk.ads.showInterstitialAd({ duration });
            console.log('✅ Interstitial ad completed');
        } catch (error) {
            console.error('❌ Error showing interstitial ad:', error);
        }
    }
    
    // Track analytics events
    trackEvent(eventName, data = {}) {
        if (!this.sdk || !this.isInitialized) {
            console.log(`📊 Analytics event (dev mode): ${eventName}`, data);
            return;
        }
        
        try {
            this.sdk.analytics.trackEvent(eventName, data);
        } catch (error) {
            console.error('❌ Error tracking event:', error);
        }
    }
    
    // Remote persistence methods
    async saveRemoteData(key, data) {
        if (!this.sdk || !this.isInitialized) {
            console.log(`💾 Remote save (dev mode): ${key}`, data);
            return true;
        }
        
        try {
            console.log(`💾 Saving remote data: ${key}`);
            await this.sdk.persistence.remote.set(key, data);
            console.log(`✅ Remote data saved: ${key}`);
            return true;
        } catch (error) {
            console.error(`❌ Error saving remote data: ${key}`, error);
            return false;
        }
    }
    
    async loadRemoteData(key) {
        if (!this.sdk || !this.isInitialized) {
            console.log(`📂 Remote load (dev mode): ${key}`);
            return null;
        }
        
        try {
            console.log(`📂 Loading remote data: ${key}`);
            const data = await this.sdk.persistence.remote.get(key);
            console.log(`✅ Remote data loaded: ${key}`, data);
            return data;
        } catch (error) {
            console.error(`❌ Error loading remote data: ${key}`, error);
            return null;
        }
    }
    
    async removeRemoteData(key) {
        if (!this.sdk || !this.isInitialized) {
            console.log(`🗑️ Remote remove (dev mode): ${key}`);
            return true;
        }
        
        try {
            console.log(`🗑️ Removing remote data: ${key}`);
            await this.sdk.persistence.remote.remove(key);
            console.log(`✅ Remote data removed: ${key}`);
            return true;
        } catch (error) {
            console.error(`❌ Error removing remote data: ${key}`, error);
            return false;
        }
    }
    
    // Local persistence methods
    async saveLocalData(key, data) {
        if (!this.sdk || !this.isInitialized) {
            console.log(`💾 Local save (dev mode): ${key}`, data);
            return true;
        }
        
        try {
            console.log(`💾 Saving local data: ${key}`);
            await this.sdk.persistence.local.set(key, data);
            console.log(`✅ Local data saved: ${key}`);
            return true;
        } catch (error) {
            console.error(`❌ Error saving local data: ${key}`, error);
            return false;
        }
    }
    
    async loadLocalData(key) {
        if (!this.sdk || !this.isInitialized) {
            console.log(`📂 Local load (dev mode): ${key}`);
            return null;
        }
        
        try {
            console.log(`📂 Loading local data: ${key}`);
            const data = await this.sdk.persistence.local.get(key);
            console.log(`✅ Local data loaded: ${key}`, data);
            return data;
        } catch (error) {
            console.error(`❌ Error loading local data: ${key}`, error);
            return null;
        }
    }
    
    async removeLocalData(key) {
        if (!this.sdk || !this.isInitialized) {
            console.log(`🗑️ Local remove (dev mode): ${key}`);
            return true;
        }
        
        try {
            console.log(`🗑️ Removing local data: ${key}`);
            await this.sdk.persistence.local.remove(key);
            console.log(`✅ Local data removed: ${key}`);
            return true;
        } catch (error) {
            console.error(`❌ Error removing local data: ${key}`, error);
            return false;
        }
    }
}

// Export for use in other files
window.ArkadiumIntegration = ArkadiumIntegration; 