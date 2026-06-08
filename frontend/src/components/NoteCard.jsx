import React from 'react'

export default function NoteCard({ note, onDelete }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{note.title || 'Untitled note'}</h3>
          <p className="mt-2 text-sm text-slate-600">Encrypted note stored securely.</p>
        </div>
        <button
          type="button"
          onClick={onDelete}
          className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
        >
          Delete
        </button>
      </div>
      <div className="mt-4 text-sm text-slate-500">
        Created {new Date(note.createdAt).toLocaleString()}
      </div>
    </div>
  )
}
