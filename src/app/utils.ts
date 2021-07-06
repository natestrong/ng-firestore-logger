export function Memoize<T>(): any {
  const mem = new Map();
  return function (target: T, key: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    descriptor.value = function (...args: any) {
      const argsAsString = JSON.stringify(args);
      if (!mem.has(argsAsString)) {
        mem.set(argsAsString, original.apply(this, args));
      } else {
      }

      return mem.get(argsAsString);
    };
    return descriptor;
  };
}
