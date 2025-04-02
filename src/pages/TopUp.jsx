import React, { useState } from 'react'

const dummyReceivers = [
  { id: 1, name: 'Giz', account: '900782139' },
  { id: 2, name: 'John Doe', account: '123456789' },
  { id: 3, name: 'Jane Smith', account: '987654321' },
]

const TopUpPage = () => {
  const [selectedReceiver, setSelectedReceiver] = useState(dummyReceivers[0].id)

  const handleSelectChange = (event) => {
    setSelectedReceiver(parseInt(event.target.value, 10))
  }

  return (
    <div className='transfer-container'>
      <div className='transfer-card'>
        <h2>Top Up</h2>

        {/* Dropdown Select */}
        <div className='input-group'>
          <label className='label'>To</label>
          <select
            className='select-input'
            value={selectedReceiver}
            onChange={handleSelectChange}
          >
            {dummyReceivers.map((receiver) => (
              <option key={receiver.id} value={receiver.id}>
                {receiver.account} ({receiver.name})
              </option>
            ))}
          </select>
        </div>

        {/* Amount Input */}
        <div className='amount-container'>
          <span className='label'>Amount</span>
          <p className='amount'>IDR 150.000,00</p>
          <hr />
          <span className='balance'>
            Balance: <span className='balance-amount'>IDR 10.000.000</span>
          </span>
        </div>

        {/* Notes Input */}
        <div className='input-group'>
          <label className='label'>Notes:</label>
          <input
            type='text'
            className='notes-input'
            placeholder='Write a note...'
          />
        </div>

        {/* Transfer Button */}
        <button className='transfer-btn'>Top Up</button>
      </div>
    </div>
  )
}

export default TopUpPage
