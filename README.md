# rc-dropdown

## Project setup
```
npm i @vagrantir/rc-dropdown
```

### Using component

```javascript
import RcDropdown, { RcDropdownItem } from  @vagrantir/rc-dropdown

Vue.component('RcDropdown', RcDropdown)
```

```html
<RcDropdown :items="items" v-model="selectedItem" :data-options="{disable_search: false}" style="width: 150px"/>
```

### Properties
```javascript
const props = {
    value: {
      type: [String, Number, Array],
      default: '',
    },
    items: {
      type: [Array],
      default() {
        return [];
      },
    },
    'data-options': {
      type: Object,
      default() {
        return {
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
      },
    },
    'data-placeholder': {
      type: [String],
      default: '',
    }
  }
  ```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

