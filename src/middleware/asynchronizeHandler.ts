const asyncWrap = (fn: (...args: any) => any) =>
    function asyncHandlerWrap(...args: any){
        const fnReturn = fn(...args)
        const next = args[args.length-1]
        return Promise.resolve(fnReturn).catch(next)
    }

export default asyncWrap