MicroModal.init({
    onShow: modal => console.log(`${modal.id} is shown`),
    onClose: modal => console.log(`${modal.id} is hidden`),
    openTrigger: 'data-micromodal-trigger', 
    closeTrigger: 'data-micromodal-close',
    openClass: 'is-open', 
    disableScroll: true, 
    disableFocus: false, 
    awaitOpenAnimation: false, 
    awaitCloseAnimation: false, 
    debugMode: true
});
MicroModal.show('modal-1');
MicroModal.close('modal-1');