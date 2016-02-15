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
    this.editGroup();
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
      let section = document.getElementById('group_' + key);
      section.style.height = (screen.height - 200) + 'px';
      let link = document.querySelector('#close_' + key);
      link.addEventListener('click', (e) => {
        this.toggleHidden(e, '#group_' + key, true);
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
    editLinks.forEach((link) => link.addEventListener('click', (e) => toggleModal(e, '#edit_group')));
    document.querySelector('#edit_group_close').addEventListener('click', (e) => toggleModal(e, '#edit_group'));

    let joinLinks = Array.from(document.querySelectorAll('.button_join'));
    joinLinks.forEach((link) => link.addEventListener('click', (e) => toggleModal(e, '#join_group')));
    document.querySelector('#join_group_close').addEventListener('click', (e) => toggleModal(e, '#join_group'));
  }

  editGroup() {
    document.getElementById('show_group_details').addEventListener('click', (e) => {
      this.stop(e);
      document.getElementById('group_details').classList.toggle('hidden');
    });
    document.getElementById('edit_group_link').addEventListener('click', (e) => {
      this.stop(e);
      document.getElementById('group_title').classList.toggle('hidden');
      document.getElementById('edit_group_title').classList.toggle('hidden');
      document.getElementById('group_details').classList.toggle('hidden', true);
      document.getElementById('edit_group_details').classList.toggle('hidden');
    });
    document.getElementById('delete_group_link').addEventListener('click', (e) => {
      this.stop(e);
      document.getElementById('group_deletion_confirmation').classList.toggle('hidden');
    });
    document.getElementById('add_members').addEventListener('click', (e) => {
      this.stop(e);
      this.toggleTab('group_members', false);
      this.toggleTab('add_members', true);
    });
    document.getElementById('group_members').addEventListener('click', (e) => {
      this.stop(e);
      this.toggleTab('group_members', true);
      this.toggleTab('add_members', false);
    });
  }

  toggleTab(tabName, active) {
    var classListLink = document.getElementById(tabName).classList;
    var classListTab = document.getElementById(tabName + '_tab').classList;
    if (active) {
      classListLink.add('active');
      classListTab.remove('hidden');
    } else {
      classListLink.remove('active');
      classListTab.add('hidden');
    }
  }

  languageSelector() {
    ['#language_selector_link', '#language_selector_menu'].forEach((s) =>
      document.querySelector(s).addEventListener('click', (e) => this.toggleHidden(e, '#language_selector_menu'))
    );
  }
}

export default new App()