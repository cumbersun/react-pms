import { useAccount, useConfig, useGasPrice, useBalance, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi'
import { config } from '../components/WGProvider'
import { parseEther } from 'viem'

export default function Dashboard() {
  const { address, status } = useAccount()
  const wgConfig = useConfig()
  const gasPrice = useGasPrice({ config })

  const { sendTransaction, data: hash, isPending, status: sendStatus, error } = useSendTransaction()
  const { isLoading: isConfirming, isSuccess: isConfirmed, status: receiptStatus } = useWaitForTransactionReceipt({ hash })

  console.log('sendStatus: ', sendStatus, 'receiptStatus:', receiptStatus)

  const acc1 = '0x7dF5039a40d72EDB5899C8A1270c8258624Ef50c'
  const acc2 = '0x26e37ea3246316A5fF3fe5ae7fB370DC14d57679'

  const balance1 = useBalance({ address: acc1 })
  const balance2 = useBalance({ address: acc2 })


  const chains = wgConfig.chains.map((chain) => {
    return { name: chain.name, id: chain.id }
  })




  const renderAccount = () => {
    return (
      <div className="flex w-full">
        <div className="card bg-base-100  flex-grow shadow-xl">
          <div className="card-body">
            <h2 className="card-title">acc1: {acc1}</h2>
            <p>balance: {balance1?.data?.formatted} eth</p>
            <p>{isPending ? 'confirming' : 'send'},  sendStatus: {sendStatus}, data: {hash} </p>
            {sendStatus === 'error' && <p>error: {error.message}</p>}
            <p> {isConfirming && 'waiting for confimation...'} </p>
            <p> {isConfirmed && 'Transaction confirmed'} </p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={async () => sendTransaction({ to: acc2, value: parseEther('0.002') })}>send 0.002 eth</button>
            </div>
          </div>
        </div>
        <div className="divider divider-horizontal"></div>
        <div className="card bg-base-100  flex-grow shadow-xl">
          <div className="card-body">
            <h2 className="card-title">acc2: {acc2}</h2>
            <p>balance: {balance2?.data?.formatted} eth</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={async () => sendTransaction({ to: acc1, value: parseEther('0.002') })}>send 0.002 eth</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const notConnected = (
    <>
      <h2>Please connect wallet first!</h2>
      <h3>address: {address},  status: {status}</h3>
    </>
  )

  const renderGas = () => {
    return (
      <h2>gas status: {gasPrice.status}, gas data: {gasPrice.data?.toString()} wei </h2>
    )
  }

  const renderChainList = () => {
    return (
      <>
        {renderGas()}
        <h2>Chain list</h2>
        <ul>
          {
            chains.map((chain) => {
              return (
                <li key={chain.id}>name: {chain.name} , id: {chain.id}</li>
              )
            })
          }
        </ul>
      </>
    )

  }

  return (
    <>
      {status != "connected" ? notConnected : <h1>hi</h1>}
      {renderChainList()}
      {renderAccount()}
    </>
  )
}