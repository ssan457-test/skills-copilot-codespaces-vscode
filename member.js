function skillsMember(){
    return {
        restrict: 'E',
        templateUrl: 'modules/skills/views/member.html',
        controller: 'SkillsMemberController',
        contorllerAs: 'vm',
        bindToController: true,
        scope: {
            member: "="
        }
    };
}