// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

contract SocialDapp {
    struct Post {
        string title;
        string url;
    }

    Post[] public posts;
    uint public id = 0;

    function createPost(string memory t, string memory u) public {
        Post memory p;
        p.title = t;
        p.url = u;
        posts.push(p);
        id = id + 1;
    }

}