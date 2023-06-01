let callInfo, sidebar, app;
window.onload = async () => {
    app = new window.webex.Application();
    await app.onReady();
    sidebar = await app.context.getSidebar();
    app.listen().then(() => {
        app.on("sidebar:callStateChanged", handleCallStateChange);
        app.on("application:viewStateChanged", handleViewStateChange)
    }).catch((reason) => {
        console.error("listen: fail reason=" + webex.Application.ErrorCodes[reason]);
    });
}

async function handleCallStateChange(call) {
    callInfo = call;
    switch (call.state) {
      case "Started":
        console.log("A call has come in...");
        await sidebar.showBadge({
            badgeType: 'count',
            count: 1
        });
        break;
    }
}

async function handleViewStateChange(viewState){
    if(viewState === 'IN_FOCUS'){
        await sidebar.clearBadge();
        if(callInfo) {
            await app.openUrlInSystemBrowser("https://jsonplaceholder.typicode.com/todos/200");
            callInfo = null;
        }
    }
}
