Shell = (async function(term, msg) {
    // term: html object to insert msg into
    // msg: string to insert
    //      supports \n
    var sleep, termmsg, x, i;

    function sleep(milliseconds) {
        return new Promise((resolve)=>setTimeout(resolve, milliseconds));
    }

    termmsg = "";
    for (var x = 0; x < 3; x++)
    {
        await sleep(200);
        term.innerHTML = "_";
        await sleep(200);
        term.innerHTML = "";
    }

    for (var x = 0; x < msg.length; x++)
    {
        if (msg[x] == "\n")
        {
            term.innerHTML = termmsg;
            if (!(msg[x-1] == "\n"))
            {
                for (var i = 0; i < 1; i++)
                {
                    await sleep(200);
                    term.innerHTML += "_"
                    await sleep(200);
                    term.innerHTML = term.innerHTML.substring(0, term.innerHTML.length - 1)
                }
            }
            termmsg += "<br />";
            continue;
        }
        termmsg += msg[x];
        term.innerHTML = termmsg + "_";
        await sleep(30);
    }
    while (true)
    {
        await sleep(200);
        term.innerHTML = term.innerHTML.substring(0, term.innerHTML.length - 1);
        await sleep(200);
        term.innerHTML += "_";
    }
})