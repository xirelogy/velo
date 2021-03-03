# Velo blade components library

### Introduction

Velo provides blade components that can be used to tag HTML elements independent of its theme. Purpose is to make
customizing and theming more available. Velo by default ships with a bootstrap theme that is uses Bootstrap 4.6 (at the
time of writing).

### Using from composer

- Usimg velo from composer:
  ```
  composer require xirelogy/velo
  ```

### Using velo

- The velo template can be invoked using:
  ```
  @extends('velo::templates.mobile')
  ```
- The provider for velo theme can be configured from `config('view.velo.bridge')`
    - Bootstrap is provided from the class: `Xirelogy\Velo\Bootstrap\Bridge`
    - CSS providing the bootstrap styles can be configured from:
      ```
      config('view.velo.bootstrap.css') // URL to the bootstrap CSS
      config('view.velo.bootstrap.css_integrity') // The integrity of the bootstrap CSS, optional
      ```
- Velo provides CSS classes starting with the `velo-` prefix but must be included in your project's relevant style
  files written is SASS:
  ```scss
  @import "vendor/xirelogy/velo/resources/sass/velo-common";
  ```

### Supported components

##### Alert (`x-velo::container.alert`)

- An alert frame containing alert messages (eg. Bootstrap's Alert component).
- Use the attribute `x-type` to specify the alert type (Supported values: `primary`, `secondary`, `success`, `danger`, `warning`, `info`).
- Use the attribute `x-close-button` (without value) to indicate a close button is required.

##### Button (`x-velo::control.button`)

- A button is a clickable control.
- Use the attribute `x-type` to specify the button type (Supported values: `primary`, `secondary`, `success`, `danger`, `warning`, `info`).
- Use the attribute `x-outline` (without value) to indicate that the button is a outline button.
- Use the attribute `x-action` to specify the button's action type (Default is `button`).
- Use the data `busy` (attribute `data-busy`) to specify a text that can be used when button is busy.

##### Card (`x-velo::container.card`)

- A card frame with possible title (eg. Bootstrap's Card component).
- Card title can be specified in the `title` slot.

##### Check box (`x-velo::control.check-box`)

- A check box is a control with 'check' or 'uncheck' status.
- The corresponding content relevant to the check box is specified in it's main slot.

##### Data (`x-velo::container.data`)

- A container for key-value data display.
- Should be used in conjuction of data entry, data key, data value tags.
- Example:
  ```html
  <x-velo::container.data>
    <x-velo::tag.data-entry>
      <x-velo::tag.data-key>Key #1</x-velo::tag.data-key>
      <x-velo::tag.data-value>Value #1</x-velo::tag.data-value>
    </x-velo::tag.data-entry>
    <x-velo::tag.data-entry>
      <x-velo::tag.data-key>Key #2</x-velo::tag.data-key>
      <x-velo::tag.data-value>Value #2</x-velo::tag.data-value>
    </x-velo::tag.data-entry>
  </x-velo::container.data>
  ```

##### Dialog (`x-velo::container.dialog`)

- A modal dialog frame with possible title and footer (eg. Bootstrap's Modal component).
- Dialog title can be specified in the `title` slot.
- Dialog footer can be specified in the `footer` slot.
- Use the attribute `x-close-button` (without value) to indicate a close button is required.
- Use the attribute `x-vertical-align` (without value) to align the dialog vertically.
- Use the attribute `x-scroll-content` (without value) to indicate that the content of the dialog can scroll if exceeds frame size.

##### Form group (`x-velo::container.form-group`)

- A form group indicates a section of input in a form.
- The associated label for the input can be specified in the `label` slot.
- Content for succeeded validation can be specified in the `validateSucceed` slot.
- Content for failed validation can be specified in the `validateFailed` slot.

##### Full page (`x-velo::container.full-page`)

- A full page occupies the full width and height of the page, without any margin or padding, and does not support scrolling.
- The purpose of full page is to lock the contents of a 'page' within it's content without causing undesired scrolling or side effects.

##### Input (`x-velo::container:input`)

- An input corresponds to the various input as in HTML.

##### Input group (`x-velo::container:input-group`)

- An input group is a input with possible prefix/suffix static content (eg. Bootstrap's Input group component).
- Example:
  ```html
  <x-velo::container.input-group>
    <x-velo::container.input-group-prefix>Email</x-velo::container.input-group-prefix>
    <x-velo::control.input/>
    <x-velo::container.input-group-suffix>@example.com</x-velo::container.input-group-suffix>
  </x-velo::container.input-group>
  ```

##### Loading (`x-velo::loading`)

- Loading shows an indicator that loading is in progress.
- Use the attribute `x-type` to select the type of loading to be displayed (Currently `spin` and `grow` supported, `spin` is the default).
- Use the attribute `x-parent` to specify that the loading is used in specific context (Currently `button` supported).

#### Nav bar (`x-velo::container.nav-bar`)

- A navigation bar is a bar for page navigation purpose normally placed on top of a page.
- Use the attribute `x-foreground` to specify the foreground theme (e.g. `light`, `dark`).
- Use the attribute `x-background` to specify the background theme (e.g. `light`, `dark`).

##### Page (`x-velo::container.page`)

- A page is a container for the main page content.
- Use the attribute `x-full-x` (without value) to specify the page to take the full width.
- Use the attribute `x-full-y` (without value) to specify the page to take the full height.

##### Radio (`x-velo::control.radio`)

- A radio is a control with 'selected' or 'unselected' status.
- The corresponding content relevant to the radio button is specified in it's main slot.

##### Select (`x-velo::control.select`)

- A select is a control with multiple options for selection, as in HTML.
- Available options are specified in it's corresponding `<option>` tags.

##### Text area (`x-velo::container:textarea`)

- A text area corresponds to a (normally) multi-row input as in HTML.

##### Thumbnail (`x-velo::thumbnail`)

- A thumbnail element for an image
- Use the attribute `data-src` to specify the image source.

##### Toast (`x-velo:container.toast`)

- A toast is a frame for showing toast notification message (eg. Bootstrap's Toast component).
- Toast title can be specified in the `title` slot.
- Use the attribute `x-close-button` (without value) to indicate a close button is required.

### Javascript library

Velo provides some accompanying Javascripts so that dynamic rendering and client side interaction is possible.

- Please include dependency to `@xirelogy/xw` manually in your project.
- The javascripts are provided in each individual modules and should be imported into where it should be used.
