const SearchController = require("./SearchController")
// @ponicode
describe("SearchController.index", () => {
    test("0", async () => {
        await SearchController.index({ query: "UNLOCK TABLES;" }, { json: () => "\"[3,\"false\",false]\"" })
    })

    test("1", async () => {
        await SearchController.index({ query: 0.5 }, { json: () => "\"{\"x\":5,\"y\":6}\"" })
    })

    test("2", async () => {
        await SearchController.index({ query: "DROP TABLE tmp;" }, { json: () => "\"{\"x\":[10,null,null,null]}\"" })
    })

    test("3", async () => {
        await SearchController.index({ query: "UPDATE Projects SET pname = %s WHERE pid = %s" }, { json: () => "\"{\"x\":[10,null,null,null]}\"" })
    })

    test("4", async () => {
        await SearchController.index({ query: 0.0 }, { json: () => "\"[3,\"false\",false]\"" })
    })

    test("5", async () => {
        await SearchController.index(undefined, undefined)
    })
})
