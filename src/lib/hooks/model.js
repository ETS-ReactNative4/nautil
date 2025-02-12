import { useEffect, useMemo } from 'react'
import { getObjectHash, isArray } from 'ts-fns'
import { useShallowLatest } from './shallow-latest.js'
import { useForceUpdate } from './force-update.js'

/**
 * compute with models and recompute when the models change
 * @param {*} models
 * @param {*} compute
 * @param  {...any} args args passed into compute
 * @returns
 */
export function useModelReactor(model, compute, ...args) {
  const models = isArray(model) ? model : [model]

  const latest = useShallowLatest(models)
  const latestArgs = useShallowLatest(args)
  const forceUpdate = useForceUpdate()

  const { res, deps, hash } = useMemo(() => {
    models.forEach((model) => {
      model.collect()
    })

    const res = compute(...args)

    const deps = models.map((model) => model.collect(true))
    const hash = getObjectHash(deps)

    return { res, deps, hash }
  }, [latest, latestArgs])

  useEffect(() => {
    models.forEach((model, i) => {
      const keys = deps[i]
      keys.forEach((key) => {
        model.watch(key, forceUpdate, true)
      })
    })

    return () => {
      models.forEach((model, i) => {
        const keys = deps[i]
        keys.forEach((key) => {
          model.unwatch(key, forceUpdate)
        })
      })
    }
  }, [hash, latest])

  return res
}

export function useModel(Model) {
  const forceUpdate = useForceUpdate()
  const model = useMemo(() => new Model(), [Model])
  useEffect(() => {
    model.watch('*', forceUpdate, true)
    model.watch('!', forceUpdate)
    model.on('recover', forceUpdate)
    return () => {
      model.unwatch('*', forceUpdate)
      model.unwatch('!', forceUpdate)
      model.off('recover', forceUpdate)
    }
  }, [model])
  return model
}
