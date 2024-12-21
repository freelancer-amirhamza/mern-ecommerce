const paypal = require("paypal-rest-sdk");

    paypal.configure({
        mode: "sandbox",
        client_id:"AbmwrbMuPNUTEjV_qMYpzHzafbPaGjw_OPY_SvU69rFnNqrkMGfsg2Bp2rf_Xkx8dEcDY7hsomgi2OWn",
        client_secret: "EPNWo_t_VZog_mXXpkYWyqsCBmNTTQO_sFwsDLtDUNgoZzCqG6GgI62RZc5funMbnyTXpX_mcLF0WzJK",
    });


    module.exports = paypal;
    