import { Component, Event, Element, EventEmitter, Prop, State } from '@stencil/core';

import { context } from '../../shared';
import { ContextListener } from 'dom-context';

@Component({
  tag: 'stencil-consumer',
})
export class StencilConsumer {
  @Prop() renderer: any;
  @State() context: any;
  @Element() element:HTMLElement;
  @State() resolvePromise: any;

  listener:ContextListener<Record<string,any>>

  constructor() {
    this.listener = new context.Listener({
      element: this.element,
      onChange: (next)=>this.context=next,
      onStatus: ()=>{}
    });
  }

  componentWillLoad() {
    this.listener.start()
  }

  componentDidUnload() {
    this.listener.stop()
  }

  render() {
    if (!this.context) {
      return null;
    }
    return this.renderer(this.context);
  }
}
