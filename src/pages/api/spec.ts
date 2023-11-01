import { PackageManifest } from '@/hooks/useManifest'
import { isEqual } from 'lodash'
import { NextApiRequest, NextApiResponse } from 'next'

// const REGISTRY = 'https://registry.npmmirror.com'
const REGISTRY = 'http://127.0.0.1:7001';

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { pkgName, spec } = req.query
    const [pkg] = await Promise.all([
      fetch(`${REGISTRY}/${pkgName}/${spec}`, {
        cache: 'no-store'
      }).then(res => res.json())
    ])

    if (!pkg.name) {
      res.status(404).json({})
      return
    }

    res.status(200).json({ version: pkg.version })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: e })
  }
}
