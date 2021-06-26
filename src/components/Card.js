import { useEffect, useState } from "react"
import countries from "../lib/countries"
import swap from "../icons/swap.svg"
import axios from "axios"

const Card = () => {
  useEffect(() => {
    ;(async function () {
      const result = await axios.get(
        `https://free.currconv.com/api/v7/convert?q=USD_NGN&compact=ultra&apiKey=aa68ffe7bbb99e654c0f`
      )
      setNewAmount(result.data[`USD_NGN`])
    })()
  }, [])

  const [to, setTo] = useState("NGN")
  const [from, setFrom] = useState("USD")
  const [amount, setAmount] = useState(1)
  const [newAmount, setNewAmount] = useState(0)

  const handleConvert = async (e) => {
    e.preventDefault()
    console.log("to: ", to)
    console.log("from: ", from)
    console.log(amount)

    if (amount > 0) {
      const result = await axios.get(
        `https://free.currconv.com/api/v7/convert?q=${from}_${to}&compact=ultra&apiKey=aa68ffe7bbb99e654c0f`
      )
      setNewAmount(result.data[`${from}_${to}`])
    }
  }

  const getConvertedAmount = () => {
    console.log(newAmount)
    console.log(amount)
    return newAmount * amount
  }

  const getCurrencyName = (cc) => {
    const curr = countries.find((item) => item.cc === cc)
    if (curr) {
      return curr.name
    } else {
      return null
    }
  }

  return (
    <div>
      <div className="navbar bg-yellow-500">
        <div className="sm:py-10 p-7">
          <h1 className="text-white sm:text-3xl text-2xl font-semibold text-center">
            Convert {amount} {getCurrencyName(from)} to {getCurrencyName(to)} -{" "}
            {from} to {to}
          </h1>

          <h3 className="text-white text-xl font-semibold text-center mt-3">
            ADL Currency Converter.
          </h3>
        </div>
      </div>

      <div className="bg-green-700 shadow-md p-5 py-10">
        <div className="sm:flex gap-12 justify-center rounded">
          <div className="self-center">
            <h2 className="text-left text-white text-xl mb-3">Amount</h2>
            <input
              type="number"
              className="border-black text-xl sm:w-96 w-full p-3 rounded"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="">
            <div className="my-8">
              <h2 className="text-left text-white text-xl mb-3">From</h2>
              <select
                className="border-black text-xl sm:w-96 w-full p-3 rounded"
                onChange={(e) => setFrom(e.target.value)}
              >
                {countries.map((item, i) => (
                  <option
                    key={i}
                    value={item.cc}
                    selected={item.cc === "USD"}
                  >{`(${item.cc}) ${item.name}`}</option>
                ))}
              </select>
            </div>

            <div>
              <h2 className="text-left text-white text-xl mb-3">To</h2>
              <select
                className="border-black text-xl sm:w-96 w-full p-3 rounded"
                onChange={(e) => setTo(e.target.value)}
              >
                {countries.map((item, i) => (
                  <option
                    key={i}
                    value={item.cc}
                    selected={item.cc === "NGN"}
                  >{`(${item.cc}) ${item.name}`}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div
          className="bg-white h-20 w-20 rounded-full flex justify-center items-center mx-auto mt-10 cursor-pointer"
          onClick={handleConvert}
        >
          <img src={swap} alt="swap" height={25} width={25} />
        </div>

        <div className="py-14">
          <h3 className="text-white text-xl">
            {Intl.NumberFormat("en-US").format(amount)}.00{" "}
            {getCurrencyName(from) ? getCurrencyName(from) : "Default"} =
          </h3>

          <h1 className="text-white sm:text-6xl text-4xl font-semibold">
            {Intl.NumberFormat("en-US").format(getConvertedAmount())}{" "}
            {getCurrencyName(to)}
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Card
