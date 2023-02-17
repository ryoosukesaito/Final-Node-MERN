import React from 'react'

function ChatFooter() {

  function handleSendMsg(e) {
    e.preventDefault();

  }

  return (
    <div className='mx-8 p-3 border-t'>
      <form onSubmit={handleSendMsg}>
        <div className='flex flex-row-reverse mr-4'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:shadow-outline'>
          <i className='fa-solid fa-paper-plane'></i>
        </button>
        </div>
        <textarea cols="3" rows='4'
        className="mt-2 shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
          type="text"
          placeholder="Write message ..."
        />
      </form>
    </div>
  )
}

export default ChatFooter