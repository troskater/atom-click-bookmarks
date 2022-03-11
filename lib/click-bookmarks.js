'use babel';

export default {
  eventListener: null,

  // default methods
  activate(state) {
    // create event eventListener
    this.createEventListener()

    // add event listener
    atom.workspace.activePaneContainer.paneContainer.element.addEventListener("click",this.eventListener)
  },

  deactivate() {
    this.removeEventListener()
  },

  // event listener methods
  createEventListener() {
    // create event listener
    this.eventListener = function(event) {
      // get current editor
      let editor = atom.workspace.getActiveTextEditor()
      if(!editor) return

      // get line number gutter
      let gutter = editor.gutterWithName('line-number')
      if(!gutter) return

      // get target line
      let targetLine = event.target;

      // check if it's a child element
      if(!targetLine.classList.contains('line-number')){
        if(!targetLine || typeof targetLine === 'undefined') return
        let targetLine = targetLine.closest('.line-number')

        // disallow clicking icon for foldable items
        if(!targetLine || targetLine.classList.contains('foldable')) return
      }
      if(!targetLine.classList.contains('line-number')) return

      // get target gutter
      let targetGutter = targetLine.closest('.gutter')
      if(!targetGutter) return

      // see if gutter matches the target gutter
      if(gutter.element == targetGutter){
        // toggle bookmark for the event target (part of core bookmarks package)
        atom.commands.dispatch(event.target, 'bookmarks:toggle-bookmark');

        // log
        //console.log('dispatched',event.target,targetGutter);
      }
    }
  },

  removeEventListener() {
    // remove click event
    atom.workspace.activePaneContainer.paneContainer.element.removeEventListener('click',this.eventListener)

    // reset eventListener
    this.eventListener = null
  }
};
