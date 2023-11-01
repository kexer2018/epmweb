import useSwr from 'swr';

// const REGISTRY = 'https://registry.npmmirror.com';
const REGISTRY = 'http://127.0.0.1:7001';

export default function useRegistry() {
  return useSwr('registry', async () => {
    return fetch(`${REGISTRY}`)
      .then((res) => res.json());
  });
}
