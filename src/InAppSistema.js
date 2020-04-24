import RNIap, { purchaseErrorListener, purchaseUpdatedListener } from 'react-native-iap';
import Sistema from '../src/Sistema'

const itemSkus = Platform.select({
    ios: [
        ''
    ],
    android: [
        'ecuca_subs_pro'
    ]
});

class InAppSistema {
    constructor() {
        this.purchaseUpdatedListener = null
        this.purchaseErrorSubscription = null
        this.init()
    }

    async init() {
        await RNIap.initConnection()
    }

    async endConnection() {
        await RNIap.endConnection();
    }

    async getAvailablePurchases() {
        try {
            const purchases = await RNIap.getAvailablePurchases();
            const filtered = purchases.filter(item => item.productId == 'ecuca_subs_pro')

            if (filtered.length == 0) {
                Sistema.setUserToPremium('k2PywrrnuLWC0DL5ktjiBiB3FNG3', false)
            }
        } catch (err) {
            Alert.alert(err.message);
        }
    }

    requestPurchase = async (sku) => {
        try {
            await RNIap.requestSubscription(sku, false);
        } catch (err) {
            //alert(err.code, err.message);
        }
    }

    async startPurchase() {
        try {
            const products = await RNIap.getSubscriptions(itemSkus);
            this.requestPurchase(products[0].productId)
        } catch (err) {
            //alert(err.message);
        }
    }

    setListners() {
        this.purchaseUpdateSubscription = purchaseUpdatedListener(purchase => {
            const receipt = purchase.transactionReceipt;
            if (receipt) {
                //alert(receipt)
                Sistema.setUserToPremium('k2PywrrnuLWC0DL5ktjiBiB3FNG3', true)
                    .then(() => {
                        RNIap.acknowledgePurchaseAndroid(receipt.purchaseToken);
                        RNIap.finishTransaction(purchase, false);
                    })
            }
        });

        this.purchaseErrorSubscription = purchaseErrorListener(error => {
            //alert('purchaseErrorListener', error);
        });
    }

    closeListeners() {
        if (this.purchaseUpdateSubscription) {
            this.purchaseUpdateSubscription.remove();
            this.purchaseUpdateSubscription = null;
        }

        if (this.purchaseErrorSubscription) {
            this.purchaseErrorSubscription.remove();
            this.purchaseErrorSubscription = null;
        }

        this.endConnection();
    }
}

export default new InAppSistema()