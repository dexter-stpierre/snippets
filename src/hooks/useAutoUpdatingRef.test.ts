import { useAutoUpdatingRef } from './useAutoUpdatingRef';
import { renderHook } from '@testing-library/react'
import { useEffect, useState } from 'react';

type RenderInitialProps = {
  data: any
}

describe('useAutoUpdatingRef', () => {
  it('should update the ref when the data bbeing passed to it changes', () => {
    const { result, rerender } = renderHook(({ data }) => {
      return useAutoUpdatingRef(data)
    }, { initialProps: { data: 'initialData' } })

    expect(result.current.current).toBe('initialData');

    rerender({ data: 'newData' })

    expect(result.current.current).toBe('newData')
  })

  it('should not cause an effect to rerun when changed', () => {
    const cb = jest.fn();
    const { result, rerender } = renderHook(({ data, callback }) => {
      const ref = useAutoUpdatingRef(data)
      useEffect(() => {
        callback(ref)
      }, [callback, ref])
      return ref;
    }, { initialProps: { data: 'initialData', callback: cb } })

    expect(result.current.current).toBe('initialData');
    expect(cb).toHaveBeenCalled()

    rerender({ data: 'newData', callback: cb })

    expect(result.current.current).toBe('newData')
    expect(cb).toHaveBeenCalledTimes(1)
  })
})