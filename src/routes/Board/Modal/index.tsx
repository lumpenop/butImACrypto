import ModalPortal from './Portal'

import styles from './modal.module.scss'

import {useState, MouseEvent, ChangeEvent, Dispatch, SetStateAction, useRef, useEffect} from 'react'

import store from 'store'

interface Props {
  setIsModal: Dispatch<SetStateAction<boolean>>
  isModal: boolean
}

const Modal = ({setIsModal, isModal}: Props) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const [subject, setSubject] = useState('')
  const [content, setContent] = useState('')
  const submitClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    store.set('board', { subject, content })
  }
  const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSubject(event.currentTarget.value)
  }

  const textareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.currentTarget.value)
  }

  const modalClose = () => {
    setIsModal(false)
  }

  useEffect(() => {
    const clickOutside = (e: any) => {
      // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
      if (isModal && modalRef.current && !modalRef.current.contains(e.currentTarget)) {
        setIsModal(false);
      }
    };

    document.addEventListener("mousedown", clickOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [isModal]);
  return (
    <ModalPortal>
      <div className={styles.modalContainer} ref={modalRef}>
        <div className={styles.modal}>
          <button type='button' onClick={modalClose}>X</button>
          <form>
            <input
              onChange={inputChange}
              placeholder='제목'
              className={styles.modalSubject}
              type='text'
              value={subject}
            />
            <button className={styles.modalSubmit} onClick={submitClick} type='submit'>
              작성완료
            </button>
            <textarea onChange={textareaChange} placeholder='내용' className={styles.modalContent} value={content} />
          </form>
        </div>
      </div>
    </ModalPortal>
  )
}

export default Modal
