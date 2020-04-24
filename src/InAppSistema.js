import RNIap, { purchaseErrorListener, purchaseUpdatedListener } from 'react-native-iap';

class InAppSistema {
    constructor() {
        //purchaseUpdatedListener = null
        //purchaseErrorListener = null
    }

    requestPurchase = async (sku) => {
        try {
            await RNIap.requestPurchase(sku, false);
        } catch (err) {
            alert(err.code, err.message);
        }
    }

    async getProducts() {
        try {
            this.setListners()
            this.requestPurchase('apoioaoapp')
        } catch (err) {
            console.warn(err); // standardized err.code and err.message available
        }
    }

    setListners() {
        this.purchaseUpdateSubscription = purchaseUpdatedListener(purchase => {
            alert('purchaseUpdatedListener', purchase);
            const receipt = purchase.transactionReceipt;
            if (receipt) {
                /*yourAPI.deliverOrDownloadFancyInAppPurchase(purchase.transactionReceipt)
                    .then((deliveryResult) => {
                        if (isSuccess(deliveryResult)) {
                            // Tell the store that you have delivered what has been paid for.
                            // Failure to do this will result in the purchase being refunded on Android and
                            // the purchase event will reappear on every relaunch of the app until you succeed
                            // in doing the below. It will also be impossible for the user to purchase consumables
                            // again untill you do this.
                            if (Platform.OS === 'ios') {
                                RNIap.finishTransactionIOS(purchase.transactionId);
                            } else if (Platform.OS === 'android') {
                                // If consumable (can be purchased again)
                                RNIap.consumePurchaseAndroid(purchase.purchaseToken);
                                // If not consumable
                                RNIap.acknowledgePurchaseAndroid(purchase.purchaseToken);
                            }

                            // From react-native-iap@4.1.0 you can simplify above `method`. Try to wrap the statement with `try` and `catch` to also grab the `error` message.
                            // If consumable (can be purchased again)
                            RNIap.finishTransaction(purchase, true);
                            // If not consumable
                            RNIap.finishTransaction(purchase, false);
                        } else {
                            // Retry / conclude the purchase is fraudulent, etc...
                        }
                    });*/
            }
        });

        this.purchaseErrorSubscription = purchaseErrorListener(error => {
            alert('purchaseErrorListener', error);
        });
    }
}

export default new InAppSistema()