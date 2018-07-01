Shell = (async function(term, msg, interactive) {
    // term: html object to insert msg into
    // msg: string to insert
    //      supports \n
    var sleep, termmsg, x, i;

    interactive = typeof interactive !== 'undefined' ? interactive : false;
    console.log(interactive);

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
    if (interactive)
    {
        document.addEventListener('keydown', function(event) {
            var keyCode = event.keyCode;
            if (keyCode > 127)
            {
                keyCode -= 144;
            }
            if (keyCode > 31 && keyCode < 127)
            {
                if (term.innerHTML.endsWith("_"))
                {
                    term.innerHTML = term.innerHTML.slice(0, -1);
                }
                term.innerHTML += String.fromCharCode(keyCode).toLowerCase();
            }
            else if (keyCode == 13)
            {
                if (term.innerHTML.endsWith("_"))
                {
                    term.innerHTML = term.innerHTML.slice(0, -1);
                }
                term.innerHTML += "<br />";
            }
        });
    }

    while (true)
    {
        if (!term.innerHTML.endsWith("_"))
        {
            term.innerHTML += "_";
            await sleep(200);
        }

        if (term.innerHTML.endsWith("_"))
        {
            term.innerHTML = term.innerHTML.substring(0, term.innerHTML.length - 1);
            await sleep(200);
        }
    }
})
