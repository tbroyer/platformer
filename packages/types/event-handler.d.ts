import type { Callback } from "@platformer/event-target";

interface ClassAccessorDecorator<This extends EventTarget, Value> {
  (
    target: ClassAccessorDecoratorTarget<This, Value>,
    context: ClassAccessorDecoratorContext<This, Value>,
  ): ClassAccessorDecoratorResult<This, Value>;
}

export function eventHandler<
  This extends EventTarget,
  E extends Event,
>(options?: {
  type?: string;
  attribute?: `on${string}`;
}): ClassAccessorDecorator<This, Callback<This, E> | null>;
