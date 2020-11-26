MicroModal.init({
    onShow: modal => console.log(`${modal.id} is shown`),
    onClose: modal => console.log(`${modal.id} is hidden`),
    openTrigger: 'data-micromodal-trigger', 
    closeTrigger: 'data-micromodal-close',
    openClass: 'is-open', 
    disableScroll: true, 
    disableFocus: false, 
    awaitOpenAnimation: false, 
    awaitCloseAnimation: true, 
    debugMode: true
});
