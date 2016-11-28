#MEAN Session 10 Homework Solution

##Homework Solutions
- add bootstrap styles to the edit pirate form
- add validation to the edit pirate form
- add a cancel botton to the edit pirate form



`assets/js/pirate-detail.component.js`

`assets/templates/pirate-detail.html`



```html
<h1>Pirate Detail View</h1>
<div class="col-xs-12">
    <div ng-hide="$ctrl.editorEnabled">
        <dl class="dl-horizontal">
            <dt>Name</dt>
            <dd>{{ $ctrl.pirate.name }}</dd>
            <dt>Vessel</dt>
            <dd>{{ $ctrl.pirate.vessel }}</dd>
            <dt>Weapon</dt>
            <dd>{{ $ctrl.pirate.weapon }}</dd>
        </dl>
        <button class="btn btn-primary" ng-click="$ctrl.enableEditor($ctrl.pirate)">Edit</button>
        <button class="btn btn-primary" type="submit" ng-click="$ctrl.back()">Back</button>
    </div>
```

Reset the default state of the page for ease of editing (watch out for the comma in the object declaration).

`self.editorEnabled = true;`

```html
<div ng-show="$ctrl.editorEnabled">
    <form name="updatePirate" ng-submit="$ctrl.savePirate($ctrl.pirate, $ctrl.pirate._id)">
        <div class="form-group" ng-class="{'has-error': updatePirate.pname.$touched && updatePirate.pname.$invalid } ">
            <label>Name</label>
            <input name="pname" ng-model="$ctrl.pirate.name">
            <p class="help-block" ng-show="addform.pname.$invalid && addform.pname.$touched">You must enter a name.</p>
        </div>
        <div class="form-group" ng-class="{'has-error': updatePirate.pvessel.$touched && updatePirate.pvessel.$invalid } ">
            <label>Vessel</label>
            <input name="pvessel" ng-model="$ctrl.pirate.vessel">
        </div>
        <div class="form-group" ng-class="{'has-error': updatePirate.pweapon.$touched && updatePirate.pweapon.$invalid } ">
            <label>Weapon</label>
            <input name="pweapon" ng-model="$ctrl.pirate.weapon">
        </div>
        <button class="btn btn-primary" type="submit">Save</button>
        <button class="btn btn-primary" ng-click="$ctrl.disableEditor()">Cancel</button>
    </form>
</div>
```

Add `required`, `minlength="2"` to the input fields. 

Add the hidden paragraphs with $touched and $invalid.

```html
<div ng-show="$ctrl.editorEnabled">
    <form name="updatePirate" ng-submit="$ctrl.savePirate($ctrl.pirate, $ctrl.pirate._id)">
        <div class="form-group" ng-class="{'has-error': updatePirate.pname.$touched && updatePirate.pname.$invalid } ">
            <label>Name</label>
            <input name="pname" ng-model="$ctrl.pirate.name" required minlength="2">
            <p class="help-block" ng-show="updatePirate.pname.$invalid">You must enter a name.</p>
        </div>
        <div class="form-group" ng-class="{'has-error': updatePirate.pvessel.$touched && updatePirate.pvessel.$invalid } ">
            <label>Vessel</label>
            <input name="pvessel" ng-model="$ctrl.pirate.vessel" required minlength="2">
            <p class="help-block" ng-show="updatePirate.pvessel.$invalid">You must enter a vessel.</p>
        </div>
        <div class="form-group" ng-class="{'has-error': updatePirate.pweapon.$touched && updatePirate.pweapon.$invalid } ">
            <label>Weapon</label>
            <input name="pweapon" ng-model="$ctrl.pirate.weapon" required minlength="2">
            <p class=" help-block " ng-show="updatePirate.pweapon.$invalid ">You must enter a vessel.</p>
        </div>
        <button class="btn btn-primary" type="submit">Save</button>
        <button class="btn btn-primary" ng-click="$ctrl.disableEditor()">Cancel</button>
    </form>
</div>
```

Fix for the cancel button

```js
angular.module('pirateDetail', []).component('pirateDetail', {
    templateUrl: '/templates/pirate-detail.html',

    controller: ['$http', '$routeParams', '$location',
        function PirateDetailController($http, $routeParams, $location) {
            var self = this;
            // initialize previousValue
            var previousValue = {};
            $http.get('/api/pirates/' + $routeParams.pirateId)
                .then(function(response) {
                    self.pirate = response.data;
                });

            self.back = function() {
                $location.path('/');
            }
            self.editorEnabled = false;

            self.enableEditor = function(pirate) {
                // copy current value of pirate to previousValue
                angular.copy(pirate, previousValue);
                self.editorEnabled = true;
            }
            self.disableEditor = function(pirate) {
                // copy previousValue to pirate
                angular.copy(previousValue, pirate);
                self.editorEnabled = false;
            }
            self.savePirate = function(pirate, pid) {
                console.log(pirate.name)
                $http.put('/api/pirates/' + pid, pirate)
                    .then(function(res) {
                        self.editorEnabled = false;
                    })
            }
        }
    ]
});
```

```
<h1>Pirate Detail View</h1>

<div ng-hide="$ctrl.editorEnabled">
    <dl class="dl-horizontal">
        <dt>Name</dt>
        <dd>{{ $ctrl.pirate.name }}</dd>
        <dt>Vessel</dt>
        <dd>{{ $ctrl.pirate.vessel }}</dd>
        <dt>Weapon</dt>
        <dd>{{ $ctrl.pirate.weapon }}</dd>
    </dl>
    <button class="btn btn-primary" ng-click="$ctrl.enableEditor($ctrl.pirate)">Edit</button>
    <button class="btn btn-primary" type="submit" ng-click="$ctrl.back()">Back</button>
</div>

</div>

<div ng-show="$ctrl.editorEnabled">
    <form name="updatePirate" ng-submit="$ctrl.savePirate($ctrl.pirate, $ctrl.pirate._id)">
        <div class="form-group" ng-class="{'has-error': updatePirate.pname.$touched && updatePirate.pname.$invalid } ">
            <label>Name</label>
            <input name="pname" ng-model="$ctrl.pirate.name">
            <p class="help-block" ng-show="addform.pname.$invalid && addform.pname.$touched">You must enter a name.</p>
        </div>
        <div class="form-group" ng-class="{'has-error': updatePirate.pvessel.$touched && updatePirate.pvessel.$invalid } ">
            <label>Vessel</label>
            <input name="pvessel" ng-model="$ctrl.pirate.vessel">
        </div>
        <div class="form-group" ng-class="{'has-error': updatePirate.pweapon.$touched && updatePirate.pweapon.$invalid } ">
            <label>Weapon</label>
            <input name="pweapon" ng-model="$ctrl.pirate.weapon">
        </div>
        <button class="btn btn-primary" type="submit">Save</button>
        <button class="btn btn-primary" ng-click="$ctrl.disableEditor($ctrl.pirate)">Cancel</button>
    </form>
</div>
```
