
type operations = "add" | "substract" | "multipy" | "divide"

export default (action: operations) => {
  switch (action) {
    case "add":
      return (oldVal: number, addedVal: number) => oldVal + addedVal 
  }
}