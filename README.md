# Get closest parent which has specified attributes

This module implemented to get selector of clicked nodes for web analytics configuration automated check

````html
<ul class="menu">
    <li class="menu-item">
        <a class="menu-link" title="Click to go" data-interaction-id="12345"> <!-- This node has analytics attributes -->
            <span class="click-target">Click target</span> <!-- This is click target -->
        </a>
    </li>
</ul>
````

````javascript
getClosestParentByAttributes(clickTarget, ['class', 'title', 'data-interaction-id']
// returns [class="menu-link"][title="Click to go"][data-interaction-id="12345"] span
````