# Angular moment duration format

**Fiters for use and format Moment.js duration in AngularJS views**

AngularJS filters that lets you use Moment.js duration in your angular views.

Brings [moment-duration-format](https://github.com/jsmreese/moment-duration-format) to angular view.

Heavily inpired by [angular-moment](https://github.com/urish/angular-moment).

---

## Installation

Node.js

`npm install angular-moment-duration-format`

Browser

```html
<script src="path/to/angular.js"></script>
<script src="path/to/moment.js"></script>
<script src="path/to/moment-duration-format.js"></script>
<script src="path/to/angular-moment-duration-format.js"></script>
```

`angular-moment-duration-format` requires `angular.js`, `moment.js` and `moment-duration-format.js`

Moment is planning to add duration format in its core (see [1048](https://github.com/moment/moment/issues/1048)).

---

## Usage

### Prerequisite

Add the module `angularDurationFormat` as a dependency to your app module:

```javascript
var myapp = angular.module('myapp', ['angularDurationFormat']);
```

### General

Each filter can be used on expression accepted by [`moment.duration`](http://momentjs.com/docs/#/durations/creating/) single argument constructor.

Valid inputs:

- `Number` length of time in milliseconds
- `Object` with `seconds`, `minutes`, `hours`, `days`, `weeks`, `months`, `years` keys (or short counterpart: `y`, `M`, `w`, `d`, `h`, `m`, `s`, `ms`)  like `{minutes: 2, hours: 2}`
- `String` hour, minute, second string separated by colons like `23:59:59` or ISO 8601 duration like `'P1Y2M3DT4H5M6S'`

To use `moment.duration(Number, String)` in your view use `amdCreate` filter, passing the unit as argument.

You can find more detailed information about `moment.duration` [in the official documentation](http://momentjs.com/docs/#/durations/creating/)

### `amdFormat` filter

Formats a duration using `moment-duration-format` [`format`](https://github.com/jsmreese/moment-duration-format#basics) method.

The filter accepts the same parameters of [`format`](https://github.com/jsmreese/moment-duration-format#basics) method:

- `template`
- `precision`
- `settings`

### `amdHumanize` filter

Formats a duration using momentjs `humanize()` method. See [here](http://momentjs.com/docs/#/durations/humanize/) more info about how moment humanizes duration.

**Note** that moment documentation has a section about how to customize [relative time](http://momentjs.com/docs/#/customization/relative-time/) that be be use to customize output of `humanize()` and `amdHumanize` filter.

### `amdCreate` filter

Creates `moment.duration` specifying unit. Accepts a `unit` parameter.

Returns ISO string representation of duration, in order to be used together with other filters like `amdFormat` and `amdHumanize`

Example:

```html
<span>{{ 15 | amdCreate:'minutes' | amdFormat:'HH:mm' }}</span>
<span>{{ 10 | amdCreate:'hours' | amdHumanize }}</span>
```

### `amdAdd` filter

Add value to duration. Wraps moment duration [`add`](http://momentjs.com/docs/#/durations/add/).

Returns ISO string representation of duration.

Example:

```html
<span>{{ myDuration | amdAdd:10:'minutes' | amdFormat:'HH:mm' }}</span>
<span>{{ 10 | amdCreate:'hours' | amdAdd:myOtherDuration | amdFormat:'HH:mm' }}</span>
```

### `amdSubtract` filter

Subtract value to duration. Wraps moment duration [`subtract`](http://momentjs.com/docs/#/durations/subtract/).

Returns ISO string representation of duration.

Example:

```html
<span>{{ myDuration | amdSubtract:10:'minutes' | amdFormat:'HH:mm' }}</span>
<span>{{ 10 | amdCreate:'hours' | amdSubtract:myOtherDuration | amdFormat:'HH:mm' }}</span>
```

----

## License

Released under the terms of the [MIT License](LICENSE).