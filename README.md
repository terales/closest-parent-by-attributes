````
<div class="container">
    <ul class="menu">
        <li class="menu-item">
            <a class="menu-link" title="Click to go" data-interaction-id="12345">
                <span class="click-target">Click target</span> <!-- This is click target -->
            </a>
        </li>
        <li class="menu-item">
            <a class="menu-link" title="Just another link" data-interaction-id="67890">
                <span class="click-target">Just for crowd</span>
            </a>
        </li>
    </ul>
</div>
````

````
getClosestParentByAttributes(clickTarget, ['class', 'title', 'data-interaction-id']
// returns [class="menu-link"][title="Click to go"][data-interaction-id="12345"] span
````