let lan_data = process.env.LAN

let TRL = function (name: string) {
    if (lan_data != undefined) {
        return lan_data[name]
    }
    return "undefined"
}
export {TRL}