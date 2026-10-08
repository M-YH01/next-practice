"use client";

import { useState } from "react";

const initialNotes = [
  { id: 1, text: "Next.js 첫 화면 만들기" },
  { id: 2, text: "메모 앱 완성하기" },
];

export default function Notes() {
  const [notes, setNotes] = useState(initialNotes);
  const [nextId, setNextId] = useState(3);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null); // 수정 중인 메모의 ID (없으면 null)
  const [deletingId, setDeletingId] = useState(null); // 삭제 확인 중인 메모의 ID
  const [error, setError] = useState("");

  function resetForm() {
    setText("");
    setEditingId(null);
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    const value = text.trim();
    if (value === "") {
      setError("내용을 입력해 주세요.");
      return;
    }
    if (editingId === null) {
      setNotes([...notes, { id: nextId, text: value }]);
      setNextId(nextId + 1);
    } else {
      // 같은 ID의 메모만 바꾼다.
      setNotes(notes.map((note) => (note.id === editingId ? { ...note, text: value } : note)));
    }
    resetForm();
  }

  function startEdit(note) {
    setEditingId(note.id);
    setText(note.text);
    setDeletingId(null);
    setError("");
  }

  function confirmDelete(id) {
    setNotes(notes.filter((note) => note.id !== id));
    setDeletingId(null);
    // 수정 중인 메모를 지웠다면 폼도 등록 상태로 돌린다.
    if (editingId === id) {
      resetForm();
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder={editingId === null ? "새 메모를 입력하세요" : "메모를 수정하세요"}
          aria-label="메모 내용"
        />
        <button className="primary" type="submit">
          {editingId === null ? "등록" : "저장"}
        </button>
        {editingId !== null && (
          <button type="button" onClick={resetForm}>
            취소
          </button>
        )}
      </form>
      {error && <p className="error" role="alert">{error}</p>}

      {notes.length === 0 && <p className="muted">등록된 메모가 없습니다. 위에서 새 메모를 등록해 보세요.</p>}
      <ul>
        {notes.map((note) =>
          deletingId === note.id ? (
            <li key={note.id} className="confirm">
              <span className="text">“{note.text}” 메모를 삭제할까요?</span>
              <button className="danger" onClick={() => confirmDelete(note.id)}>삭제 확인</button>
              <button onClick={() => setDeletingId(null)}>취소</button>
            </li>
          ) : (
            <li key={note.id}>
              <span className="text">{note.text}</span>
              <button onClick={() => startEdit(note)}>수정</button>
              <button className="danger" onClick={() => setDeletingId(note.id)}>삭제</button>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
