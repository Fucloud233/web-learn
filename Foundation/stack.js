Node = {
    elem : Int16Array,
    next : Node,
    Node : function(elem, next) {
        this.elem = elem;
        this.next = next;
    }
};

const Stack = {
    sp  : Node,
    size : Int16Array,

    Stack: function() {
        sp = new Node(0, null);
        size = 0;
    },

    push: function(elem) {
        sp.next = new Node(elem, sp.next);
        len++;
    },

    pop : function() {
        if(this.sp.next==null) {
            return false
        }

        temp = sp.next;
        this.sp.next = temp.next;
        delete next;
        len--;

        return true;
    },

    top : function() {
        return this.sp.next.elem;
    },

    len : function () {
        return this.len;
    }
};

s = new Stack();
for(i=0; i<5; i++) {
    s.push(i+1);
}

while(s.len!=0) {
    s.pop();
}




