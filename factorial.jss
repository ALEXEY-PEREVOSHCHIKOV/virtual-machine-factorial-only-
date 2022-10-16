set $a 1
set $b 1
jsin $n
key startFac
multiplus $a $b $b
IfEqual $a $n
add $a 1 $a
goONto startFac
fiED
jsout $b
exit