import React, { useCallback } from 'react'
import { useSetAppContext } from '@/components/Providers/hooks/useSetAppContext'
import { ModalProps } from '@/components/Modal/Modal'

function useModal<T>(
  Component: React.ComponentType<T extends ModalProps ? T : ModalProps>
) {
  const dispatch = useSetAppContext()

  const open = useCallback(
    (props: T extends ModalProps ? T : ModalProps) => {
      dispatch((prevState) => {
        const target = prevState.modal.find((m) => m.Component === Component)

        return {
          ...prevState,
          modal: target
            ? prevState.modal.map((m) =>
              m.Component === Component
                ? { ...m, props: { ...props, isOpen: props.isOpen } }
                : m
            )
            : prevState.modal.concat({
              Component,
              props,
            }),
        }
      })
    },
    [dispatch, Component]
  )

  const close = useCallback(() => {
    dispatch((state) => {
      return {
        ...state,
        modal: state.modal.map((m) => {
          return {
            ...m,
            props:
              m.Component === Component
                ? { ...m.props, isOpen: false }
                : m.props,
          }
        }),
      }
    })
  }, [dispatch, Component])

  return { open, close }
}

export default useModal
