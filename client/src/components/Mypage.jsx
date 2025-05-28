import { useState } from 'react';
import { useNavigate } from 'react-router';

function Mypage() {
  const navigate = useNavigate(); //フック。関数などイベント内で動的に遷移。

  function goToMyForm() {
    navigate('/mypage/records');
  }

  function goToStanp() {
    navigate('/mypage/stamp');
  }
  function goToMap() {
    navigate('/mypage/map');
  }

  return (
    <>
      <button onClick={goToMyForm}>投稿履歴</button>
      <button onClick={goToStanp}>スタンプ履歴</button>
      <button onClick={goToMap}>地図</button>
    </>
  );
}

export default Mypage;
