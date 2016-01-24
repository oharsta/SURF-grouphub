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
  }

  sortingSelector() {
    // all a of sort_menu_blue, on click then toggle hidden on sort_drop_down_blue
    // all a's in sort_drop_down_blue toggle hidden on sort_drop_down_blue
  }

  groupsSelector() {
    let toggle = (id, state) => (e) => {
      let group = document.querySelector(id);
      group.classList.toggle('hidden', state);
    };
    ['all_groups', 'organisation_groups', 'my_groups', 'search'].forEach((key) => {
      let link = document.querySelector('#close_' + key);
      link.addEventListener('click', (e) => {
        this.stop(e);
        let group = document.querySelector('#group_' + key);
        group.classList.toggle('hidden', true);
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
        selector.addEventListener('change', (e) => {
          let group = document.querySelector('#group_' + key);
          group.classList.toggle('hidden', !e.target.checked);
        })
      }
    });
    let searchInput = document.querySelector('#searchInput');
    searchInput.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        let search = document.querySelector('#group_search');
        search.classList.toggle('hidden', false);
      }
    })
  }

}

export default new App()