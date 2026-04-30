(function () {
    data.title = "Legal IP Requests";

    try {
        data.scope = (gs.getCurrentScopeName && gs.getCurrentScopeName()) || '';
    } catch (e) {
        data.scope = '';
    }
})()
