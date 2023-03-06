import { useAutoUpdatingRef } from './useAutoUpdatingRef';
import { renderHook } from '@testing-library/react'
import { useCallback, useEffect } from 'react';

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
    const mockCallback = jest.fn();
    const { result, rerender } = renderHook(({ data, callback }) => {
      const ref = useAutoUpdatingRef(data)
      useEffect(() => {
        callback(ref.current)
      }, [callback, ref])
      return ref;
    }, { initialProps: { data: 'initialData', callback: mockCallback } })

    expect(result.current.current).toBe('initialData');
    expect(mockCallback).toHaveBeenCalled()

    rerender({ data: 'newData', callback: mockCallback })

    expect(result.current.current).toBe('newData')
    expect(mockCallback).toHaveBeenCalledTimes(1)
  })

  it('should always pass the newest version of the ref to a function call', () => {
    const mockCallback = jest.fn();
    const { result, rerender } = renderHook(({ data, callback }) => {
      const ref = useAutoUpdatingRef(data)
      useEffect(() => {
        callback(ref.current)
      }, [callback, ref])
      return ref;
    }, { initialProps: { data: 'initialData', callback: mockCallback } })

    expect(result.current.current).toBe('initialData');
    expect(mockCallback).toHaveBeenCalled()

    const newMockCallback = jest.fn()
    rerender({ data: 'newData', callback: newMockCallback })

    expect(result.current.current).toBe('newData')
    expect(newMockCallback).toHaveBeenCalled()
    expect(newMockCallback).toHaveBeenCalledWith('newData')
  })

  it('should always pass the newest version of the ref to a callback', () => {
    const mockCallback = jest.fn();
    const { result, rerender } = renderHook(({ data }) => {
      const ref = useAutoUpdatingRef(data)

      const callback = useCallback(() => {
        return ref.current
      }, [ref])

      return callback;
    }, { initialProps: { data: 'initialData' } })

    expect(result.current()).toBe('initialData');

    rerender({ data: 'newData' })

    expect(result.current()).toBe('newData')
  })
})