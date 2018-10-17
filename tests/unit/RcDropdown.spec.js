import {expect}                     from 'chai';
import {shallowMount}               from '@vue/test-utils';
import RcDropdown, {RcDropdownItem} from '@/components/RcDropdown.vue';

describe('Test RcDropdown.vue component', () => {
  const defaultOptions = {
    allow_single_deselect: false,
    disable_search: true,
    disable_search_threshold: 0,
    enable_split_word_search: false,
    inherit_select_classes: false,
    max_selected_options: Infinity,
    no_results_text: 'No results',
    placeholder_text_multiple: 'Select Some Options',
    placeholder_text_single: 'Select an option',
    search_contains: false,
    group_search: true,
    single_backstroke_delete: true,
    width: '100%',
    display_disabled_options: true,
    display_selected_options: true,
    include_group_label_in_selected: false,
    max_shown_results: Infinity,
    case_sensitive_search: false,
    hide_results_on_select: true,
  };
  const targetItem = new RcDropdownItem(3, 'test4');
  const targetSearchItem = new RcDropdownItem(6, 'search7');
  const testItems = [
    new RcDropdownItem(0, 'test1'),
    new RcDropdownItem(1, 'test2'),
    new RcDropdownItem(2, 'test3'),
    targetItem,
    new RcDropdownItem(4, 'test5'),
    new RcDropdownItem(5, 'test6'),
    targetSearchItem,
    new RcDropdownItem(7, 'test8'),
    new RcDropdownItem(8, 'test9'),
    new RcDropdownItem(10, 'test10'),
    new RcDropdownItem(11, 'test11'),
    new RcDropdownItem(12, 'test12'),

  ];
  const wrapper = shallowMount(RcDropdown, {
    propsData: {
      items: [],
    },
  });
  const defaultPlaceholder = 'Select an option';

  describe('Test default state', () => {
    it('should be created', () => {
      expect(wrapper.is(RcDropdown)).to.be.true;
    });

    it('should have default options', () => {
      const options = wrapper.vm.settings;
      for (let key in defaultOptions) {
        expect(options[key] === defaultOptions[key]).is.true;
      }
    });

    it('should contain custom styles element', () => {
      expect(wrapper.find('.rc-dropdown__style-host').is('div')).is.true;
    });

    it('should contain activator element', () => {
      expect(wrapper.find('.rc-dropdown__activator').is('a')).is.true;
    });

    it('activator element should not be opened', () => {
      expect(wrapper.contains('.rc-dropdown__activator.rc-dropdown__activator--opened')).is.not.true;
      expect(wrapper.contains('.rc-dropdown__options')).is.not.true;
      expect(wrapper.vm.isOpened).is.not.true;
    });

    it('should not have single deselect', () => {
      expect(wrapper.contains('.rc-dropdown__activator .single-deselect')).is.not.true;
    });

    it('should have empty value', () => {
      expect(wrapper.vm.value).is.empty;
    });

    it('should have single placeholder with default text', () => {
      expect(wrapper.findAll('span.rc-dropdown__placeholder')).to.have.lengthOf(1);
      expect(wrapper.contains('span.rc-dropdown__placeholder')).is.true;
      expect(wrapper.find('span.rc-dropdown__placeholder').text()).equal(defaultPlaceholder);
    });
  });

  describe('Test with prepared items state', function() {
    before(() => {
      wrapper.setProps({ items: testItems });
    });

    after(() => {
      wrapper.setProps({ items: [] });
    });

    it('should has correct items count', () => {
      expect(wrapper.vm.items).to.have.lengthOf(12);
    });

    describe('Test click functionality', () => {
      it('should be opened on click', () => {
        wrapper.find('.rc-dropdown__activator').trigger('click');
        expect(wrapper.vm.isOpened).is.true;
        expect(wrapper.contains('.rc-dropdown__activator.rc-dropdown__activator--opened')).is.true;
        expect(wrapper.contains('.rc-dropdown__options')).is.true;
      });

      it('should select value on click by item', () => {
        const listItems = wrapper.findAll('.rc-dropdown__options li.rc-dropdown-items__item');
        expect(listItems).to.be.lengthOf(12);
        expect(listItems.at(3).is('li')).is.true;
        listItems.at(3).trigger('click');
        expect(wrapper.emitted().change).exist;
        expect(wrapper.emitted().change[0][0]).equal(targetItem.value);
      });

      it('should close after click', () => {
        expect(wrapper.contains('.rc-dropdown__activator.rc-dropdown__activator--opened')).is.not.true;
        expect(wrapper.contains('.rc-dropdown__options')).is.not.true;
      });

      it('should show selected vaue', () => {
        wrapper.setProps({ value: targetItem.value });
        expect(wrapper.find('span.rc-dropdown__placeholder').text()).equal(targetItem.label);
      });
    });

    describe('Test single deselect', () => {
      before(() => {
        wrapper.setProps({ value: targetItem.value });
        wrapper.setProps({ dataOptions: Object.assign({}, defaultOptions, { allow_single_deselect: false }) });
      });

      after(() => {
        wrapper.setProps({ dataOptions: Object.assign({}, defaultOptions) });
        wrapper.setProps({ value: '' });
      });

      it('should not have single deselect', () => {
        expect(wrapper.vm.settings.allow_single_deselect).is.not.true;
        expect(wrapper.contains('.rc-dropdown__activator .single-deselect')).is.true;
      });

      it('should have single deselect', () => {
        wrapper.setProps({ dataOptions: Object.assign({}, defaultOptions, { allow_single_deselect: true }) });
        expect(wrapper.vm.settings.allow_single_deselect).is.true;
        expect(wrapper.contains('.rc-dropdown__activator .single-deselect')).is.true;
      });

      it('should deselect on "single deselect" click', () => {
        wrapper.find('.rc-dropdown__activator .single-deselect').trigger('click');
        expect(wrapper.emitted().change).exist;
        expect(wrapper.emitted().change[wrapper.emitted().change.length - 1][0]).equal('');
        wrapper.setProps({ value: '' });
        expect(wrapper.contains('.rc-dropdown__activator .single-deselect')).is.not.true;
      });
    });

    describe('Test search element', () => {
      const openState = wrapper.vm.isOpened;

      before(() => {
        wrapper.vm.isOpened = true;
      });

      after(() => {
        wrapper.vm.isOpened = openState;
      });

      it('should not have search element by default', () => {
        expect(wrapper.vm.settings.disable_search).is.true;
        expect(wrapper.vm.settings.disable_search_threshold).equal(0);
        expect(wrapper.contains('.rc-rc-dropdown__options .rc-dropdown__search')).is.not.true;
      });

      it('should enable search element', () => {
        wrapper.setProps({ dataOptions: Object.assign({}, wrapper.vm.settings, { disable_search: false, disable_search_threshold: 10 }) });

        expect(wrapper.vm.settings.disable_search).is.false;
        expect(wrapper.vm.settings.disable_search_threshold).equal(10);

        expect(wrapper.contains('.rc-dropdown__options .rc-dropdown__search')).is.true;
        expect(wrapper.contains('.rc-dropdown__options .rc-dropdown__search input.rc-dropdown-search__input')).is.true;
      });

      it('should filter items by search', () => {
        const input = wrapper.find('.rc-dropdown__options .rc-dropdown__search input.rc-dropdown-search__input');
        input.element.value = 'search';
        input.trigger('input');
        expect(input.element.value).equal('search');
        expect(wrapper.vm.searchText).equal('search');
        expect(wrapper.vm.filteredItems.length).equal(1);

        input.element.value = '1';
        input.trigger('input');
        expect(wrapper.vm.searchText).equal('1');
        expect(wrapper.vm.filteredItems.length).equal(4);
      });
    });
  });
});
