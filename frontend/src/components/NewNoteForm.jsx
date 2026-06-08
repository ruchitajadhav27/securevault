import React, { useState } from 'react'
import { useCreateNote } from '../hooks/useCreateNote'
import { encryptText } from '../utils/crypto'
import { useAuth } from '../context/AuthContext'

export default function NewNoteForm() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const { encryptionKeyBase64 } = useAuth()
  const createNoteMutation = useCreateNote()

  const handleSubmit = async event => {
    event.preventDefault()
    if (!body) return

    if (!encryptionKeyBase64) {
      return alert('Missing encryption key. Please login again.')
    }

    const encrypted = await encryptText(encryptionKeyBase64, body)

    createNoteMutation.mutate({
      title,
      encryptedContent: encrypted.encryptedContent,
      iv: encrypted.iv,
      authTag: encrypted.authTag
    })

    setTitle('')
    setBody('')
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="note-title">
          Title
        </label>
        <input
          id="note-title"
          className="input-base w-full"
          placeholder="Note title"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="note-body">
          Note body
        </label>
        <textarea
          id="note-body"
          className="textarea-base w-full"
          rows="5"
          placeholder="Write your secure note here"
          value={body}
          onChange={event => setBody(event.target.value)}
        />
      </div>
      <button type="submit" className="button-primary w-full">
        Save note
      </button>
    </form>
  )
}
