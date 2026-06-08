import React from 'react'
import { useNotes } from '../hooks/useNotes'
import { useDeleteNote } from '../hooks/useDeleteNote'
import { useAuth } from '../context/AuthContext'
import NoteCard from '../components/NoteCard'
import NewNoteForm from '../components/NewNoteForm'

export default function Dashboard() {
  const { logout } = useAuth()
  const { data: notes = [], isLoading, isError } = useNotes()
  const deleteNoteMutation = useDeleteNote()

  return (
    <div className="page-shell space-y-8">
      <header className="flex flex-col gap-4 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-700 to-primary p-8 text-white shadow-2xl shadow-slate-200/10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-300">SecureVault</p>
          <h1 className="mt-4 text-4xl font-semibold">Encrypted Notes Dashboard</h1>
          <p className="mt-2 max-w-2xl text-slate-200">Your note content is encrypted locally before it reaches the server.</p>
        </div>
        <button onClick={logout} className="button-primary bg-slate-100 text-slate-900 hover:bg-slate-200">
          Logout
        </button>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <NewNoteForm />
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">My Notes</h2>
          <span className="text-sm text-slate-500">Encrypted metadata kept secure</span>
        </div>

        {isLoading && <p className="text-slate-500">Loading notes...</p>}
        {isError && <p className="text-red-500">Unable to load notes. Please try again.</p>}
        {!isLoading && notes.length === 0 && <p className="text-slate-600">No notes yet. Create one to keep it safe.</p>}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} onDelete={() => deleteNoteMutation.mutate(note.id)} />
          ))}
        </div>
      </section>
    </div>
  )
}
