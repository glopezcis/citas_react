const Error = ({children}) => {
  return (
    <div className='bg-red-800 text-white text-center font-bold p-3 mb-3 uppercase rounded'>
      {children}
    </div>
  )
}

export default Error