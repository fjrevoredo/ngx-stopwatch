# Ngx-Stopwatch 1.0.1

Minimalistic stopwatch for Angular applications

![GitHub](https://img.shields.io/github/license/fjrevoredo/ngx-stopwatch.svg)
![GitHub tag (latest by date)](https://img.shields.io/github/tag-date/fjrevoredo/ngx-stopwatch.svg)
![GitHub repo size](https://img.shields.io/github/repo-size/fjrevoredo/ngx-stopwatch.svg)
![npm bundle size](https://img.shields.io/bundlephobia/min/ngx-stopwatch.svg)
![npm](https://img.shields.io/npm/dw/ngx-stopwatch.svg)

[![Support](https://img.shields.io/badge/Support-Angular%207%2B-blue.svg)]()

![GitHub stars](https://img.shields.io/github/stars/fjrevoredo/ngx-stopwatch.svg?style=social)
![GitHub followers](https://img.shields.io/github/followers/fjrevoredo.svg?style=social)

## Table of contents

- [Details](#details)
- [Installation](#installation)
- [Usage](#usage)

## Details
There's a showcase project with different examples on how to use the library. I don't think you'll have any problems using it in your projects. I aimed at keeping it simple yet flexible.

Feel free to comment, fork or submit a pull request.

## Installation

`ngx-stopwatch` is available via [npm](https://www.npmjs.com/package/ngx-stopwatch)

Using npm:
```bash
$ npm install ngx-stopwatch --save
```

## Usage

Import `NgxStopwatchModule` in  in the root module(`AppModule`):
```typescript
// Import library module
import { NgxStopwatchModule } from 'ngx-stopwatch';

@NgModule({
  imports: [
    ...,
    NgxStopwatchModule
  ]
})
export class AppModule { }
```

Add `NgxStopwatchService` service wherever you want to use the `ngx-stopwatch`.
```typescript
import { NgxStopwatchService } from 'ngx-stopwatch';

class AppComponent {
  constructor(protected stopwatchService: NgxStopwatchService) {}

  start() {
    this.stopwatchService.start();
  }

  reset() {
    this.stopwatchService.reset();
  }
}
```

You can now place it in your templates like this:
```html
<ngx-stopwatch></ngx-stopwatch>
```

You can find more examples in the showcase project.
