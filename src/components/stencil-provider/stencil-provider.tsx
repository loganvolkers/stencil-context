import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Listen,
  Prop,
  State,
  Watch,
} from '@stencil/core';

import { context } from '../../shared';
import { ContextProvider } from 'dom-context';

interface ConsumerEvent extends Event {
  detail: Function;
}

@Component({
  tag: 'stencil-provider',
})
export class StencilProvider {
  @Prop() STENCIL_CONTEXT: { [key: string]: any };
  @Watch('STENCIL_CONTEXT')
  watchContext(newContext) {
    this.provider.context = newContext;
  }
  @Element()
  element: HTMLElement;

  provider: ContextProvider<Record<string, any>>;

  
  componentWillLoad() {
    this.provider = new context.Provider({
      element: this.element,
      initialState: this.STENCIL_CONTEXT,
    });

    this.provider.start();
  }

  componentDidUnload() {
    this.provider && this.provider.stop();
  }

  render() {
    return <slot />;
  }
}
