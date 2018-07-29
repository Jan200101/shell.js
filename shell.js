Shell = (async function(term, msg, interactive = false, debug = false)
{
    // term: html object to insert msg into
    // msg: string to insert
    //      supports \n
    // interactive: allows for input after all text has been displayed
    // debug: shows key code of key pressed
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
    if (interactive)
    {
        var modifier = 32;
        document.addEventListener('keydown', function(event) {
            var keyCode = event.keyCode;
            if (debug)
            {
                console.log(keyCode);
            }
            if (keyCode == 16 || keyCode == 20)
            {
                if (modifier != 0)
                {
                    modifier = 0;
                }
                else
                {
                    modifier = 32;
                }
                return;
            }
            /*  if (keyCode > 127)
             *{
             *   keyCode -= 144;
             *}
             */
            if (keyCode > 31 && keyCode < 127)
            {
                if (term.innerHTML.endsWith("_"))
                {
                    term.innerHTML = term.innerHTML.slice(0, -1);
                }
                term.innerHTML += String.fromCharCode(keyCode + modifier);
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
