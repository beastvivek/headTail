# **HEAD** 

## NAME
```head -- display first lines of a file```

## SYNOPSIS
```head [-n count | -c bytes] [file ...]```

```
head [file...]
  It displays the first 10 lines or less if file has lines less than 10.

head -n count [file...]
  It displays first count number of lines.

head -c bytes [file...] 
  It displays first bytes number of bytes.
```

---
# **TAIL**

## NAME
```tail -- display the last part of a file```

## SYNOPSIS
```tail [ -c bytes | -n lines] [file ...]```

```
tail [file...]
  It displays the last 10 lines or less if file has lines less than 10.

tail -n count [file...]
  It displays last count number of lines.

tail -c bytes [file...] 
  It displays last bytes number of bytes.

tail +[num] [files...]
  Displays from the given line num to the end of the file

tail -[num] [file...]
  Displays last num number of lines. 
```