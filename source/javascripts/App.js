class App {

  stop(e) {
    if (e !== undefined && e !== null) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  start() {
    this.groupsSelector();
    this.sortingSelector();
    this.languageSelector();
    this.modals();
  }

  toggleHidden(e, id, force) {
    this.stop(e);
    let item = document.querySelector(id);
    if (force !== undefined) {
      item.classList.toggle('hidden', force);
    } else {
      //is necessary for some browsers
      item.classList.toggle('hidden');
    }
  }

  sortingSelector() {
    ['blue', 'green', 'purple', 'grey'].forEach((s) => {
      let sortToggle = document.querySelector('#sort_menu_' + s);
      sortToggle.addEventListener('click', (e) => this.toggleHidden(e, '#sort_drop_down_' + s));
      let links = Array.from(document.querySelectorAll('#sort_drop_down_' + s + ' a'));
      links.forEach((link)=> link.addEventListener('click', (e) => this.toggleHidden(e, '#sort_drop_down_' + s)));
    });
  }

  groupsSelector() {
    ['all_groups', 'organisation_groups', 'my_groups', 'search'].forEach((key) => {
      let link = document.querySelector('#close_' + key);
      link.addEventListener('click', (e) => {
        this.toggleHidden(e,'#group_' + key, true);
        //need to unselect the checkbox for state consistency
        let checkbox = document.querySelector('#select_' + key);
        if (checkbox) {
          checkbox.checked = false;
        } else {
          let search = document.querySelector('#searchInput');
          search.value = '';
        }
      });
      let selector = document.querySelector('#select_' + key);
      if (selector) {
        selector.addEventListener('change', (e) => this.toggleHidden(e, '#group_' + key, !e.target.checked));
      }
    });
    let searchInput = document.querySelector('#searchInput');
    searchInput.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        this.toggleHidden(e, '#group_search', false);
      }
    })
  }

  modals() {
    let toggleModal = (e, id) => {
      this.toggleHidden(e, id);
      document.querySelector('body').classList.toggle('modal-open');
    };
    ['notifications', 'new_group'].forEach((s) => {
      document.querySelector('#' + s + '_link').addEventListener('click', (e) => toggleModal(e, '#' + s));
      document.querySelector('#' + s + '_close').addEventListener('click', (e) => toggleModal(e, '#' + s));
    });

    let editLinks = Array.from(document.querySelectorAll('.button_edit'));
    editLinks.forEach((link) => link.addEventListener('click', (e) => toggleModal(e,'#edit_group')));
    document.querySelector('#edit_group_close').addEventListener('click', (e) => toggleModal(e, '#edit_group'));
  }

  languageSelector() {
    ['#language_selector_link', '#language_selector_menu'].forEach((s) =>
      document.querySelector(s).addEventListener('click', (e) => this.toggleHidden(e, '#language_selector_menu'))
    );
  }
}

export default new App()